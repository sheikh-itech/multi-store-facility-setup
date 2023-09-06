package org.msf.beans;

import org.msf.utils.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = Constants.MSF_Users)
//@CompoundIndex(name="user_index", def="{'id':1, 'email':1}")
public class User {

	@Id
	private String id;
	@Indexed(unique = true)
	private String email;	//User Id for login
	private String userId;	//Can also use for login
	private String firstName;
	private String lastName;
	private long mobile;
	private String dob;
	private String password;
	private boolean active;
	private boolean useCustomId;
	private boolean termsCond;
	private Address address;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public long getMobile() {
		return mobile;
	}
	public void setMobile(long mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		if(email!=null)
			this.email = email.toLowerCase();
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isUseCustomId() {
		return useCustomId;
	}
	public void setUseCustomId(boolean useCustomId) {
		this.useCustomId = useCustomId;
	}
	public boolean isTermsCond() {
		return termsCond;
	}
	public void setTermsCond(boolean termsCond) {
		this.termsCond = termsCond;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
}
