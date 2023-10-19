package org.msf.beans;

import org.msf.utils.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = Constants.MSF_Retailers)
public class Retailer {

	@Id
	private String id;
	@Indexed(unique = true)
	private String email;	//User Id for login
	private String databaseId;	//For now email id from 0 to @ (exclusive)
	private String firstName;
	private String lastName;
	private long mobile;
	private String dob;
	private String password;
	private boolean active;
	private boolean termsCond;
	private Address address;
	
	public void updateRetailerId() {
		this.id = this.email.substring(0, this.email.indexOf("@"));
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
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
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public boolean isTermsCond() {
		return termsCond;
	}
	public void setTermsCond(boolean termsCond) {
		this.termsCond = termsCond;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public String getDatabaseId() {
		return databaseId;
	}
	public void setDatabaseId(String databaseId) {
		this.databaseId = databaseId;
	}
}
