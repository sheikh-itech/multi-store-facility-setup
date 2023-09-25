package org.msf.api.business;

import java.io.FileNotFoundException;

import javax.servlet.http.HttpServletRequest;

import org.msf.beans.Product;
import org.msf.beans.Response;
import org.msf.service.business.FileStorageService;
import org.msf.service.business.ZXingQRCodeGenerator;
import org.msf.utils.MsfSecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("QR")
public class ZXingQRCodeApi {

	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private MsfSecurityUtil securityUtil;
	@Autowired
	private ZXingQRCodeGenerator qrCodeGenerator;
	@Autowired
	private FileStorageService storageService;
	
	@RequestMapping(value="/generate", method=RequestMethod.POST)
	public ResponseEntity<Response> generateQRCode(@RequestPart String productDetail,
			@RequestPart MultipartFile productImage, HttpServletRequest request) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		Product productInfo = null;
		String userId = null;
		try {
			productInfo = objectMapper.readValue(productDetail, Product.class);
			userId = securityUtil.getUserId(request);
	    } catch (Exception ex) {
			res.setMessage("Product detail read error");
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
	    }
		
		if(productInfo.getCategory()==null || productInfo.getCategory().isBlank())
			productInfo.setCategory("General");
		
		try {
			productInfo = qrCodeGenerator.generateQRCode(productInfo, userId, productImage);
			res.setSuccess(true);
			res.setData(productInfo);
			res.setMessage("QR Code generated, save name/id for future reference");
			status = HttpStatus.CREATED;
		} catch(Exception ex) {
			res.setSuccess(false);
			res.setData(productInfo);
			res.setMessage("Failed to generate code: "+ex.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/update", method=RequestMethod.PATCH)
	public ResponseEntity<Response> updateQRCode(@RequestBody Product productInfo) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		if(productInfo.getCategory()==null || productInfo.getCategory().isBlank())
			productInfo.setCategory("General");
		
		try {
			productInfo = qrCodeGenerator.updateQRCode(productInfo);
			res.setSuccess(true);
			res.setData(productInfo);
			res.setMessage("QR Code updated, save name/id for future reference");
			status = HttpStatus.CREATED;
		} catch(Exception ex) {
			res.setSuccess(false);
			res.setData(productInfo);
			res.setMessage("Failed to update code: "+ex.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/verify/{id}/{verified}", method=RequestMethod.PATCH)
	public ResponseEntity<Response> verifyQRCode(@PathVariable("id") String id,
			@PathVariable("verified") boolean verified) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		try {
			
			if(verified && qrCodeGenerator.verifyQrCode(id, verified)) {
				res.setSuccess(true);
				res.setMessage("Qr Code verified");
				status = HttpStatus.ACCEPTED;
			} else {
				res.setMessage("Maybe already verified");
				status = HttpStatus.CONFLICT;
			}
		} catch(Exception ex) {
			res.setMessage("Failed to verify Qr code: "+ex.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		res.setData(id);
		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search/{name}", method = RequestMethod.GET)
    public ResponseEntity<Response> searchQrByName(@PathVariable("name") String name) {

		Response response = new Response();

        try {
            
            response.setData(qrCodeGenerator.findQRCodeByName(name));
            response.setSuccess(true);
            response.setMessage("Qr code info");
            response.setStatus(HttpStatus.OK);
            
            return new ResponseEntity<Response>(response, HttpStatus.OK);
            
        } catch (Exception ex) {
        	response.setMessage("Qr info search problem");
        	response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        	return new ResponseEntity<Response>(response, HttpStatus.OK);
        }
    }
	
	@RequestMapping(value = "/search/all", method = RequestMethod.GET)
    public ResponseEntity<Response> searchAllQrCodeInfo(HttpServletRequest request) {

        Response response = new Response();

        try {
            
            response.setData(qrCodeGenerator.findAllQRCodeInfo(securityUtil.getUserId(request)));
            response.setSuccess(true);
            response.setMessage("All Qr code info");
            response.setStatus(HttpStatus.OK);
            
            return new ResponseEntity<Response>(response, HttpStatus.OK);
            
        } catch (Exception ex) {
        	response.setMessage("Qr info search error");
        	response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        	return new ResponseEntity<Response>(response, HttpStatus.OK);
        }
    }
	
	@RequestMapping(value = "/image/download", method = RequestMethod.POST) 
	public ResponseEntity<?> downloadSvnFile(@RequestBody String filePath) {
		
		try {
			
			Resource resource = storageService.downloadFileAsResource(filePath);
			String mediaType = determineMediaType(filePath);
			
			HttpHeaders headers = new HttpHeaders();
			
			headers.add("Access-Control-Expose-Headers", "Content-Disposition");
			headers.add("Access-Control-Expose-Headers", "Content-Type");
			headers.add("Content-Type", mediaType);
			headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", filePath.substring(filePath.indexOf("/")+1)));
			headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
			headers.add("Pragma", "no-cache");
			headers.add("Expires", "0");

			return ResponseEntity.ok()
					.headers(headers).contentLength(resource.getFile().length()).body(resource);
			
		} catch (FileNotFoundException ex) {
			Response res = new Response();
			res.setMessage(ex.getMessage());
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
	    } catch (Exception ex) {
	    	Response res = new Response();
			res.setMessage("Image access error from server");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
	    }
	}
	
	//Determine media type based on file extension
	private String determineMediaType(String fileName) {
	
	    if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg"))
	        return "image/jpeg";
	    
	    return "application/octet-stream";
	}
}
