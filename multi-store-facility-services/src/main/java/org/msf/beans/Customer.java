package org.msf.beans;

import org.msf.utils.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(Constants.MSF_Customer)
@CompoundIndex(name="cust_unique_idx", def="{'id':1, 'email':1}")
public class Customer {

	@Id
	private String email;	//User Id for login
	private String id;	//Can also use for login
	private String firstName;
	private String lastName;
	private int mobile;
	private String dob;
	private Address address;
	
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
	public int getMobile() {
		return mobile;
	}
	public void setMobile(int mobile) {
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
}
