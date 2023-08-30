package org.msf.beans;

public class ProductInfo {

	private String id;
	private byte[] qrBytes;
	private String name;
	private float price;
	private String desc;
	private String code;
	
	public ProductInfo() {	}
	
	public ProductInfo(String id, byte[] qrBytes, String name, float price, String desc, String code) {
		super();
		this.id = id;
		this.qrBytes = qrBytes;
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.code = code;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public byte[] getQrBytes() {
		return qrBytes;
	}
	public void setQrBytes(byte[] qrBytes) {
		this.qrBytes = qrBytes;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
		this.desc = desc;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
}
