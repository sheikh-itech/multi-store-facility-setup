package org.msf.utils;

import java.util.Base64;

public class Base64EncDec {

	public static String encrypt(String text) {
		try {
			return Base64.getEncoder().encodeToString(text.getBytes());
		} catch(Exception ex) {
			return null;
		}
	}
	
	public static String decrypt(String data) {
		try {
			return new String(Base64.getDecoder().decode(data));
		} catch(Exception ex) {
			return null;
		}
	}
}
