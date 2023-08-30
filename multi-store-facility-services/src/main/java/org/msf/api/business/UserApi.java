package org.msf.api.business;

import org.msf.beans.User;
import org.msf.service.UserService;

import javax.servlet.http.HttpServletRequest;

import org.msf.beans.Response;
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
@RequestMapping("public/user")
public class UserApi {

	private static final Logger logger = LoggerFactory.getLogger(UserApi.class);
	
	@Autowired
	private UserService userService;
	@Autowired
	private MsfSecurityUtil securityUtil;
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseEntity<Response> addUser(@RequestBody User user) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		try {
			
			String valRes = ValidationUtil.validateUser(user);
			
			if(!valRes.equals(ResConstants.OK)) {
				res.setSuccess(false);
				res.setMessage(valRes);
				status = HttpStatus.BAD_REQUEST;
				res.setStatus(status);
			} else {
				userService.addUser(user);
				logger.info("User registration sucess, email: "+user.getEmail());
				res.setSuccess(true);
				res.setMessage("Registered successfully");
				res.setData(user);
				status = HttpStatus.CREATED;
				res.setStatus(status);
			}
			
		} catch(Exception ex) {
			user.setPassword(null);
			if(ex instanceof DuplicateKeyException) {
				if(user.isUseCustomId()) {
					res.setMessage("User already registered");
					status = HttpStatus.CONFLICT;
				} else {
					res.setMessage("Email already registered");
					status = HttpStatus.CONFLICT;
				}
			} else if(ex instanceof MongoWriteException) {
				res.setMessage("Server refused to add user");
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			} else {
				logger.error("Failed to add user: "+ex);
				res.setMessage("Failed to add user");
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
			User user = userService.getUserDetail(username);
			
			if(user!=null) {
				
				status = HttpStatus.OK;
				
				res.setSuccess(true);
				res.setData(user);
				res.setMessage("User detail found");
			} else {
				status = HttpStatus.NOT_FOUND;
				res.setMessage("User detail not found");
			}
			
		} catch(Exception ex) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			res.setMessage("Failed to search user detail");
		}
		return new ResponseEntity<Response>(res, status);
	}
}
