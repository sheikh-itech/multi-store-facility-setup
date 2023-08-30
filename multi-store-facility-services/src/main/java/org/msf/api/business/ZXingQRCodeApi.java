package org.msf.api.business;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.util.Map;

import org.msf.beans.Product;
import org.msf.beans.ProductQRInfo;
import org.msf.beans.Response;
import org.msf.service.business.ZXingQRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("QR")
public class ZXingQRCodeApi {

	@Autowired
	private ZXingQRCodeGenerator qrCodeGenerator;
	
	
	@RequestMapping(value="/generate", method=RequestMethod.POST)
	public ResponseEntity<Response> generateQRCode(@RequestBody Product productInfo) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		if(productInfo.getCategory()==null || productInfo.getCategory().isBlank())
			productInfo.setCategory("General");
		
		try {
			productInfo = qrCodeGenerator.generateQRCode(productInfo);
			res.setSuccess(true);
			res.setData(productInfo);
			res.setMessage("QR Code generated, save Id for future reference");
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
	
	@RequestMapping(value = "/search/{name}", method = RequestMethod.POST)
    public ResponseEntity<InputStreamResource> searchQrByName(@PathVariable("name") String name) {

        ResponseEntity<InputStreamResource> responseEntity;

        try {
            ProductQRInfo qrCodeInfo = qrCodeGenerator.findQRCodeByName(name);

            if(qrCodeInfo==null)
            	throw new FileNotFoundException("Requested QR Code not found");
            
            byte[] imageBytes = qrCodeInfo.getQrBytes();

            //Create the InputStreamResource from the byte array
            InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(imageBytes));

            //Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", MediaType.IMAGE_PNG_VALUE);
            headers.add("Content-Disposition", "attachment; filename=\"qrcode.png\"");
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");

            //Create the ResponseEntity with the image data and headers
            responseEntity = ResponseEntity.created(null)
                    .headers(headers)
                    .contentLength(imageBytes.length)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);

        } catch(FileNotFoundException ex) {
        	responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception ex) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return responseEntity;
    }
	
	@RequestMapping(value = "/search/category/{name}", method = RequestMethod.POST)
    public ResponseEntity<InputStreamResource> searchQrByCategory(@PathVariable("name") String name) {

        ResponseEntity<InputStreamResource> responseEntity;

        try {
            ProductQRInfo qrCodeInfo = qrCodeGenerator.findQRCodeByName(name);

            if(qrCodeInfo==null)
            	throw new FileNotFoundException("Requested QR Code not found");
            
            byte[] imageBytes = qrCodeInfo.getQrBytes();

            //Create the InputStreamResource from the byte array
            InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(imageBytes));

            //Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", MediaType.IMAGE_PNG_VALUE);
            headers.add("Content-Disposition", "attachment; filename=\"qrcode.png\"");
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");

            //Create the ResponseEntity with the image data and headers
            responseEntity = ResponseEntity.created(null)
                    .headers(headers)
                    .contentLength(imageBytes.length)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);

        } catch(FileNotFoundException ex) {
        	responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception ex) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return responseEntity;
    }
	
	@RequestMapping(value = "/download", method = RequestMethod.POST)
    public ResponseEntity<InputStreamResource> searchQrCode(@RequestBody Map<String, String> payload) {

		String id = payload.get("id");
		String name = payload.get("name");
		
        ResponseEntity<InputStreamResource> responseEntity;

        try {
            ProductQRInfo qrCodeInfo = null;
            
            if(id!=null && !id.isEmpty())
            	qrCodeInfo = qrCodeGenerator.findQRCodeById(id);
            else
            	qrCodeInfo = qrCodeGenerator.findQRCodeByName(name);

            if(qrCodeInfo==null)
            	throw new FileNotFoundException("Requested QR Code not found");
            
            byte[] imageBytes = qrCodeInfo.getQrBytes();

            //Create the InputStreamResource from the byte array
            InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(imageBytes));

            //Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", MediaType.IMAGE_PNG_VALUE);
            headers.add("Content-Disposition", "attachment; filename=\"qrcode.png\"");
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");

            //Create the ResponseEntity with the image data and headers
            responseEntity = ResponseEntity.created(null)
                    .headers(headers)
                    .contentLength(imageBytes.length)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);

        } catch(FileNotFoundException ex) {
        	responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception ex) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return responseEntity;
    }
	
	@RequestMapping(value = "/download/all", method = RequestMethod.GET)
    public ResponseEntity<Response> searchAllQrCodeInfo() {

        Response response = new Response();

        try {
            
            response.setMessage("All QR code info");
            response.setData(qrCodeGenerator.findAllQRCodeInfo());
            response.setSuccess(true);
            return new ResponseEntity<Response>(response, HttpStatus.OK);
            
        } catch (Exception ex) {
        	response.setMessage("QR info search error: "+ex.getMessage());
        	return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
