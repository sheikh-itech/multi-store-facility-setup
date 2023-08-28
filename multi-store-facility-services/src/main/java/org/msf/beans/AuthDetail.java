package org.msf.beans;

import java.util.List;
import java.util.Map;

public class AuthDetail {

	private String userId;
	private int roleId;
	private String username;
	private List<String> roles;
	private List<String> grantedModules;
	private String token;
	private String email;
	private Map<Integer, String> moduleMapping;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Map<Integer, String> getModuleMapping() {
		return moduleMapping;
	}
	public void setModuleMapping(Map<Integer, String> moduleMapping) {
		this.moduleMapping = moduleMapping;
	}
	public List<String> getGrantedModules() {
		return grantedModules;
	}
	public void setGrantedModules(List<String> grantedModules) {
		this.grantedModules = grantedModules;
	}
}
