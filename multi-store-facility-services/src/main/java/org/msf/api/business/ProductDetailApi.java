package org.msf.api.business;

import java.io.FileNotFoundException;

import org.msf.beans.Response;
import org.msf.service.business.FileStorageService;
import org.msf.service.business.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("public/products")
public class ProductDetailApi {

	@Autowired
	private FileStorageService storageService;
	@Autowired
	private ProductDetailService productService;
	
	
	@RequestMapping(value = "/search/{name}", method = RequestMethod.GET)
    public ResponseEntity<Response> searchProductByName(@PathVariable("name") String name) {

		Response response = new Response();

        try {
            
            response.setData(productService.findProductInfoByName(name, true));
            response.setSuccess(true);
            response.setMessage("Product info of: "+name);
            response.setStatus(HttpStatus.OK);
            
            return new ResponseEntity<Response>(response, HttpStatus.OK);
            
        } catch (Exception ex) {
        	response.setMessage("Product info search problem");
        	response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        	return new ResponseEntity<Response>(response, HttpStatus.OK);
        }
    }
	
	@RequestMapping(value = "/search/all", method = RequestMethod.GET)
    public ResponseEntity<Response> searchAllProductsInfo() {

        Response response = new Response();

        try {
            
            response.setData(productService.findAllProductsInfo(true));
            response.setSuccess(true);
            response.setMessage("All products info");
            response.setStatus(HttpStatus.OK);
            
            return new ResponseEntity<Response>(response, HttpStatus.OK);
            
        } catch (Exception ex) {
        	response.setMessage("All products info search error");
        	response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        	return new ResponseEntity<Response>(response, HttpStatus.OK);
        }
    }
	
	@RequestMapping(value = "/image/download", method = RequestMethod.POST) 
	public ResponseEntity<?> downloadSvnFile(@RequestBody String filePath) {
		
		try {
			filePath = filePath.replaceAll("\"", "");
			
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
