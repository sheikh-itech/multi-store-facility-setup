package org.msf.api.auth;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.msf.beans.AuthDetail;
import org.msf.beans.Response;
import org.msf.beans.LoginInfo;
import org.msf.beans.UserDetail;
import org.msf.utils.MsfAuthUtil;
import org.msf.utils.MsfSecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationApi {

	private static final Logger logger = LoggerFactory.getLogger(AuthenticationApi.class);
	
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private MsfSecurityUtil securityUtil;
	@Autowired
	private MsfAuthUtil authUtil;
	
	@RequestMapping(value="/user", method=RequestMethod.POST)
	public ResponseEntity<Response> authenticate(@RequestBody LoginInfo login) {
	
		Response res = new Response();
		UserDetail principal = null;
		
		try {
			principal = (UserDetail) authManager.authenticate(
					new UsernamePasswordAuthenticationToken(login.getUsername(), 
							login.getPassword())).getPrincipal();
			
			logger.info("User authentication success");
		}  catch (UsernameNotFoundException ex) {
			logger.error("Username Not Found: " + login.getUsername());
			res.setMessage("Username not found");
			res.setStatus(HttpStatus.NOT_FOUND);
		} catch (AccountStatusException ex) { // User account locked, disabled
			logger.error("User account has been locked: " + login.getUsername());
			res.setMessage("User account has been locked");
			res.setStatus(HttpStatus.LOCKED);
			
		} catch (BadCredentialsException ex) {
			logger.error("Incorrect username or password: " + login.getUsername());
			res.setMessage("Incorrect username or password");
			res.setStatus(HttpStatus.UNAUTHORIZED);
			
		} catch (AuthenticationServiceException ex) { // Internal system exception
			logger.error("Internal Auth Server Error:: " + login.getUsername());
			if(ex.getMessage().contains("UserDetailsService returned null"))
				res.setMessage("User detail not found");
			else
				res.setMessage("Server refused to login");
			res.setStatus(HttpStatus.FORBIDDEN);
			
		} catch (RememberMeAuthenticationException ex) {
			logger.error("Remember me auth failure: "+ex.getMessage());
			res.setMessage("Remember me auth failure");
			res.setStatus(HttpStatus.FORBIDDEN);
			
		} catch (Exception ex) {
			logger.error("Internal Server Error:: " + login.getUsername());
			res.setMessage("Server refused to login");
			res.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(principal!=null) {
			
			//Get otherDetail from DB (If needed)
			Map<Integer, String> otherDetail = new HashMap<>();
			
			AuthDetail detail = new AuthDetail();
			
			final String authToken = securityUtil.generateToken(principal, otherDetail);
			
			detail.setToken(authToken);
			detail.setUsername(principal.getUsername());
			
			if(principal.getModules()==null || principal.getModules().isEmpty()
					|| principal.getRoleId()==0) {
				res.setMessage("User '"+principal.getUsername()+"' don't have permissions");
				logger.error("User '"+principal.getUsername()+"' don't have permissions");
			} else {
				detail.setRoleId(principal.getRoleId());
				detail.setGrantedModules(Arrays.asList(principal.getModules().split(",")));
			}
			
			detail.setUserId(principal.getUserId());
			detail.setModuleMapping(otherDetail);
			detail.setEmail(principal.getEmail());
			
			res.setData(detail);
			
			res.setSuccess(true);
			res.setStatus(HttpStatus.ACCEPTED);
			res.setMessage("User authentication success");
			
			logger.info("Auth token generated for user: " + login.getUsername());
		} else {
			if(res.getMessage()==null || res.getMessage().isBlank()) {
				res.setStatus(HttpStatus.UNAUTHORIZED);
				res.setMessage("Failed to authenticate user");
			}
			logger.error("Failed to generate user identity: "+login.getUsername());
		}
		
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/user/validate", method=RequestMethod.POST)
	public ResponseEntity<Response> validateUser(HttpServletRequest request) {
		
		Response response = new Response();
		
		try {
			String token = securityUtil.getUserToken(request);
			
			if(token==null)
				throw new Exception("Token not found");
			
			String username = securityUtil.extractUsername(token);
			UserDetail user = new UserDetail();
			user.setUsername(username);
			securityUtil.validateToken(token, user);
			
			response.setSuccess(true);
			response.setStatus(HttpStatus.OK);
			response.setMessage("User validation success");
			
			logger.info("User validation success, user: "+username+", from machine: "+request.getRemoteAddr());
			
		} catch (Exception ex) {
			logger.error("User validation error, login again:: " + ex.getMessage());
			response.setStatus(HttpStatus.UNAUTHORIZED);
			response.setMessage("User validation failed, invalid token");
		}
		
		return new ResponseEntity<Response>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/user/permission", method = RequestMethod.POST)
	public ResponseEntity<Response> validateUserPermission(@RequestBody String moduleCode,
			HttpServletRequest request) {
		
		Map<String, String> userDetail = securityUtil.getUserDetails(securityUtil.getUserToken(request), moduleCode);
		
		Response response = new Response();
		response.setData(moduleCode);
		
		if(authUtil.checkModulePermission(userDetail, moduleCode)) {
			
			response.setSuccess(true);
			response.setStatus(HttpStatus.ACCEPTED);
			response.setMessage("Access granted");
			return new ResponseEntity<Response>(response, HttpStatus.OK);
			
		} else {
			response.setStatus(HttpStatus.UNAUTHORIZED);
			response.setMessage("Access not granted");
			return new ResponseEntity<Response>(response, HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public void logout() {
		
	}
}
