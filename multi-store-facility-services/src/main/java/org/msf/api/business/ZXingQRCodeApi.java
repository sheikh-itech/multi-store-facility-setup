package org.msf.api.business;

import javax.servlet.http.HttpServletRequest;

import org.msf.beans.Product;
import org.msf.beans.Response;
import org.msf.service.business.ProductDetailService;
import org.msf.service.business.ZXingQRCodeGenerator;
import org.msf.utils.MsfSecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
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
	private ProductDetailService productService;
	
	
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
    public ResponseEntity<Response> searchProductByName(@PathVariable("name") String name) {

		Response response = new Response();

        try {
            
            response.setData(productService.findProductInfoByName(name, false));
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
    public ResponseEntity<Response> searchAllProductsInfo() {

        Response response = new Response();

        try {
            
            response.setData(productService.findAllProductsInfo(false));
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
}
