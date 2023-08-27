package org.msf.utils;

import java.util.Random;

public class AdminUtil {

	public static String generateId(String email, String fName, String lName, String dob) {
		
		String username = "";
		
		if(email.length()>=2 && username.length()<10) {
			username = username + email.substring(0, 2);
		}
		if(fName.length()>=2 && username.length()<10) {
			username = username + fName.substring(0, 2);
		}
		if(lName.length()>=2 && username.length()<10) {
			username = username + lName.substring(0, 2);
		}
		if(dob.length()>=3 && username.length()<10) {
			username = username + dob.substring(dob.length()-4, dob.length());
		}
		if(username.length()<10) {
			Random random = new Random();
			while(username.length()!=10) {
				username = username + ((char) (random.nextInt(26) + 'a'));
			}
		}
		
		return username.toLowerCase();
	}
	
	public static void main(String g[]) {
		System.out.println(generateId("shapheej", "sheikh", "hapheej", "02-03-1989"));
	}
}
