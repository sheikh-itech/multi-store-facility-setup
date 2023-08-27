package org.msf.utils;

import org.msf.beans.Customer;

public class ValidationUtil {

	public static String validateCustomer(Customer customer) {
		
		if(customer.getEmail()==null || customer.getEmail().length()<3)
			return "Invalid email";
		
		if(customer.getFirstName()==null || customer.getFirstName().length()<2)
			return "First name not valid";
		
		if(customer.getLastName()==null || customer.getLastName().length()<2)
			return "Last name not valid";
		
		if(String.valueOf(customer.getMobile())==null || String.valueOf(customer.getMobile()).length()!=10)
			return "Mobile can have 10 digit";
		
		return ResConstants.OK;
	}
}
