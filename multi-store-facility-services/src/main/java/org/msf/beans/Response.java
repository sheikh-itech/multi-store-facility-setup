package org.msf.beans;

import org.springframework.http.HttpStatus;

public final class Response {

	private boolean success;
	private HttpStatus status;
	private String message;
	private Object data;

	public Response() {	super(); }
	
	public Response(boolean success, HttpStatus status, String message, Object data) {
		super();
		this.success = success;
		this.status = status;
		this.message = message;
		this.data = data;
	}
	
	/**
	 * This will create empty response object
	 */
	public static Response create() {
		
		return new Response();
	}
	
	/**
	 * This will create response object with provided values
	 */
	public static Response create(boolean success, HttpStatus status, String message, Object data) {
		
		return new Response(success, status, message, data);
	}

	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
}
