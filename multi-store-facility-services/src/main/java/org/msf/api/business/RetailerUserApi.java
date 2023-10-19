package org.msf.api.business;

import javax.servlet.http.HttpServletRequest;

import org.msf.beans.Response;
import org.msf.beans.Retailer;
import org.msf.service.RetailerUserService;
import org.msf.utils.MsfSecurityUtil;
import org.msf.utils.ResConstants;
import org.msf.utils.ValidationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.MongoWriteException;

@RestController
@RequestMapping("retailers")
public class RetailerUserApi {

	private static final Logger logger = LoggerFactory.getLogger(RetailerUserApi.class);
	
	@Autowired
	private MsfSecurityUtil securityUtil;
	@Autowired
	private RetailerUserService retailersService;
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseEntity<Response> addUser(@RequestBody Retailer retailer) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		try {
			
			String valRes = ValidationUtil.validateRetailer(retailer);
			
			if(!valRes.equals(ResConstants.OK)) {
				res.setSuccess(false);
				res.setMessage(valRes);
				status = HttpStatus.BAD_REQUEST;
				res.setStatus(status);
			} else {
				retailersService.addRetailer(retailer);
				logger.info("Retailer registration sucess, email: "+retailer.getEmail());
				res.setSuccess(true);
				res.setMessage("Registered successfully");
				res.setData(retailer);
				status = HttpStatus.CREATED;
				res.setStatus(status);
			}
			
		} catch(Exception ex) {
			retailer.setPassword(null);
			if(ex instanceof DuplicateKeyException) {
				res.setMessage("Email already registered");
				status = HttpStatus.CONFLICT;
			} else if(ex instanceof MongoWriteException) {
				res.setMessage("Server refused to add retailer");
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			} else {
				logger.error("Failed to add retailer: "+ex);
				res.setMessage("Failed to add retailer");
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
			res.setStatus(status);
		}
		return new ResponseEntity<Response>(res, status);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public ResponseEntity<Response> getUser(HttpServletRequest request) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		try {
			
			String username  = securityUtil.getUsername(request);
			Retailer retailer = retailersService.getUserDetail(username);
			
			if(retailer!=null) {
				
				status = HttpStatus.OK;
				
				res.setSuccess(true);
				res.setData(retailer);
				res.setMessage("Retailer detail found");
			} else {
				status = HttpStatus.NOT_FOUND;
				res.setMessage("Retailer detail not found");
			}
			
		} catch(Exception ex) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			res.setMessage("Failed to search retailer detail");
		}
		return new ResponseEntity<Response>(res, status);
	}
}
