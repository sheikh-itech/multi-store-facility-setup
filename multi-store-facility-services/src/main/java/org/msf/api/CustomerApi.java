package org.msf.api;

import org.msf.beans.Customer;
import org.msf.beans.Response;
import org.msf.utils.ResConstants;
import org.msf.utils.ValidationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customer")
public class CustomerApi {

	private static final Logger logger = LoggerFactory.getLogger(CustomerApi.class);
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseEntity<Response> addCustomer(Customer customer) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		try {
			
			String valRes = ValidationUtil.validateCustomer(customer);
			
			if(!valRes.equals(ResConstants.OK)) {
				res.setSuccess(false);
				res.setMessage(valRes);
				status = HttpStatus.BAD_REQUEST;
			} else {
				logger.info("Added customer, email: "+customer.getEmail());
				res.setSuccess(true);
				res.setMessage("Added successfully");
				res.setData(customer);
				status = HttpStatus.CREATED;
			}
			
		} catch(Exception ex) {
			logger.error("Failed to add customer: "+ex);
			
			res.setMessage("Failed to add customer");
		}
		return new ResponseEntity<Response>(res, status);
	}
}
