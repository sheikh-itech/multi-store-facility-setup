package org.msf.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Hapheej Sheikh
 * @since 1.0.0
 */

public class Utility {

	/** Return's -1 for error, that caller handles */
	public static int parseInt(String value) {
		try {
			return Integer.parseInt(value);
		} catch(Exception ex) {
			return -1;
		}
	}
	
	/** Return's 'false' for error, that caller handles */
	public static boolean parseBoolean(String value) {
		try {
			return Boolean.parseBoolean(value);
		} catch(Exception ex) {
			return false;
		}
	}
	
	/** Return's 0 for error, that caller handles */
	public static byte parseByte(String value) {
		try {
			return Byte.parseByte(value);
		} catch(Exception ex) {
			return 0;
		}
	}
	
	public	static String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
