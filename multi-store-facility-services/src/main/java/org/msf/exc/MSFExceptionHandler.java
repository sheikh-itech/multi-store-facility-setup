package org.msf.exc;

import org.msf.beans.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MSFExceptionHandler {

	private Response response = new Response();
	
	public MSFExceptionHandler() {
		response.setMessage("Failed to process request");
	}
	
	@ExceptionHandler(value = UserValidationException.class)
	public ResponseEntity<Response> userValidationException(UserValidationException ex) {
		
		response.setMessage("User Validation Issue, please login again");
		return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = UsernameNotFoundException.class)
	public ResponseEntity<Response> usernameNotFoundException(UsernameNotFoundException ex) {
		
		response.setMessage("Username Not Found, "+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = UserNotFoundException.class)
	public ResponseEntity<Response> userNotFoundException(UserNotFoundException ex) {
		
		response.setMessage("User Not Found, "+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = DuplicateUsernameException.class)
	public ResponseEntity<Response> exception(DuplicateUsernameException ex) {
		
		response.setMessage("Username Already Exists, "+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = ResourceNotFoundException.class)
	public ResponseEntity<Response> resourceNotFound(ResourceNotFoundException ex) {
		
		response.setMessage("Requested resource/data not found, "+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = AccessDeniedException.class)
	public ResponseEntity<Response> accessDeniedException(AccessDeniedException ex) {
		
		response.setMessage("Reource access is restricted, "+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(value = DataNotFoundException.class)
	public ResponseEntity<Response> dataNotFound(DataNotFoundException ex) {
		
		response.setMessage("Requested data fetch error, "+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<Response> exception(Exception ex) {
		
		response.setMessage("Internal Server Error!! "+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(value = Throwable.class)
	public ResponseEntity<Response> throwable(Throwable ex) {
		
		response.setMessage("Internal Server Error..."+ex.getMessage());
		return new ResponseEntity<Response>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
