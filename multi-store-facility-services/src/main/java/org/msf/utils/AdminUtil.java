package org.msf.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class AdminUtil {

	private static SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd-MM-yyyy");
	
	public static String generateId(String fName, String lName) {
		
		String today = dateFormat1.format(new Date()).replaceAll("-", "");
		
		return (fName+today+lName).toLowerCase();
	}
}
