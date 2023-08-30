package org.msf.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class MsfAuthUtil {

	private List<String> permissions = new ArrayList<>();
	
	public MsfAuthUtil() {
		permissions.add("/home");
		permissions.add("/userDetail");
		permissions.add("/userUpdate");
		permissions.add("/userRegister");
		permissions.add("/resetPassword");
		permissions.add("/qrGenerate");
		permissions.add("/qrUpdate");
		permissions.add("/qrSearch");
		permissions.add("/category");
		permissions.add("/category");
	}
	
	public boolean checkModulePermission(Map<String, String> userDetail, String moduleCode) {
		
		//validate detail either with Token or DB
		
		if(permissions.contains(moduleCode))
			return true;
		
		return false;
	}
}
