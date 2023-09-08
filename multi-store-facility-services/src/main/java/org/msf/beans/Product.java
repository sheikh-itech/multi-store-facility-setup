package org.msf.beans;

import java.io.Serializable;
import java.util.UUID;

import org.msf.utils.Base64EncDec;
import org.msf.utils.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.StringUtils;

@Document(collection = Constants.MSF_Product)
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Indexed(unique=true)
	private String name;
	private float price;
	private String desc;
	private String category;
	private boolean verified;
	
	private ProductDetail detail;
	
	public Product() {	
		this.id = UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = StringUtils.capitalize(name);
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = StringUtils.capitalize(desc);
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public boolean isVerified() {
		return verified;
	}
	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public ProductDetail getDetail() {
		return detail;
	}
	public void setDetail(ProductDetail detail) {
		this.detail = detail;
	}

	public String toString() {
		return "id:" + id + "##name:" + Base64EncDec.encrypt(name) + "##price:" + price + 
			"##desc:" + Base64EncDec.encrypt(desc) + "##category:" + Base64EncDec.encrypt(category);
	}
}
