package org.msf.api;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.msf.beans.Response;
import org.msf.service.ObjectsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("objects")
public class ObjectsApi {

	private static final Logger logger = LoggerFactory.getLogger(ObjectsApi.class);
	
	@Autowired
	private ObjectsService service;
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseEntity<Response> saveObjects(@RequestBody(required=false) Map<String, Object> requestData,
			HttpServletRequest request) {

		Response res = Response.create();
		try {
			service.saveObjects(requestData);
			res.setSuccess(true);
			res.setMessage("Objects saved");
			res.setStatus(HttpStatus.CREATED);
			logger.info("Objects saved");
		} catch(Exception ex) {
			logger.error(ex.getMessage());
			res.setSuccess(false);
			res.setMessage("Failed to save objects");
			res.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/list/all", method = RequestMethod.GET)
	public ResponseEntity<Response> getAllObjects(HttpServletRequest request) {
		
		Response res = Response.create();
		try {
			res.setSuccess(true);
			res.setData(service.searchAllObjects());
			res.setMessage("List of all objects");
			res.setStatus(HttpStatus.FOUND);
			logger.info("List of objects shared");
		} catch(Exception ex) {
			logger.error(ex.getMessage());
			res.setSuccess(false);
			res.setMessage("Failed to search objects");
			res.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/delete/{firstName}", method = RequestMethod.DELETE)
	public ResponseEntity<Response> deleteByFirstName(@PathVariable String firstName,
			HttpServletRequest request) {
		
		Response res = Response.create();
		try {
			res.setSuccess(true);
			res.setData(service.deleteByFirstName(firstName));
			res.setMessage("Deleted object having value: "+firstName);
			res.setStatus(HttpStatus.CREATED);
			logger.info("Deleteing: "+firstName);
		} catch(Exception ex) {
			logger.error(ex.getMessage());
			res.setSuccess(false);
			res.setMessage("Failed to delete objects");
			res.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
}
