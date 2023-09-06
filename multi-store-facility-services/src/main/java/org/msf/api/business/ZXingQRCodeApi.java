package org.msf.api.business;


import org.msf.beans.Product;
import org.msf.beans.Response;
import org.msf.service.business.ZXingQRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Response> searchAllQrCodeInfo() {

        Response response = new Response();

        try {
            
            response.setData(qrCodeGenerator.findAllQRCodeInfo());
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
