package org.msf.utils;

import org.msf.beans.Retailer;
import org.msf.beans.User;

public class ValidationUtil {

	public static String validateUser(User user) {
		
		if(user.getEmail()==null || user.getEmail().length()<3)
			return "Invalid email";
		
		if(user.getFirstName()==null || user.getFirstName().length()<2)
			return "First name not valid";
		
		if(user.getLastName()==null || user.getLastName().length()<2)
			return "Last name not valid";
		
		if(String.valueOf(user.getMobile())==null || String.valueOf(user.getMobile()).length()!=10)
			return "Mobile can have only 10 digits";
		
		return ResConstants.OK;
	}
	
	public static String validateRetailer(Retailer retailer) {
		
		if(retailer.getEmail()==null || retailer.getEmail().length()<3)
			return "Invalid email";
		
		if(retailer.getFirstName()==null || retailer.getFirstName().length()<2)
			return "First name not valid";
		
		if(retailer.getLastName()==null || retailer.getLastName().length()<2)
			return "Last name not valid";
		
		if(String.valueOf(retailer.getMobile())==null || String.valueOf(retailer.getMobile()).length()!=10)
			return "Mobile can have only 10 digits";
		
		return ResConstants.OK;
	}
}
