package org.msf.beans;

import java.io.Serializable;
import java.util.UUID;

import org.msf.utils.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = Constants.MSF_Rating)
public class Rating implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;	//Unique id
	
	private String productId; //Product Id
	private String retailerId;	//Show, Retail Id
	private String customerId;
	
	private float product;
	private String productDesc;
	private float retail;
	private String retailDesc;
	
	
	public Rating() {	
		this.id = UUID.randomUUID().toString().replaceAll("-", "");
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getRetailerId() {
		return retailerId;
	}
	public void setRetailerId(String retailerId) {
		this.retailerId = retailerId;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public float getProduct() {
		return product;
	}
	public void setProduct(float product) {
		this.product = product;
	}
	public String getProductDesc() {
		return productDesc;
	}
	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}
	public float getRetail() {
		return retail;
	}
	public void setRetail(float retail) {
		this.retail = retail;
	}
	public String getRetailDesc() {
		return retailDesc;
	}
	public void setRetailDesc(String retailDesc) {
		this.retailDesc = retailDesc;
	}
}
