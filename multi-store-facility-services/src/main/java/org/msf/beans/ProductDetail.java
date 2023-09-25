package org.msf.beans;

import java.util.List;

public class ProductDetail {

	private String brand;
	private String dietType;	//Veg, Non-Veg
	private String color;
	private float weight;
	private String weightUnit;
	private String dimention;
	private List<String> info;
	private String imageName;
	
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getDietType() {
		return dietType;
	}
	public void setDietType(String dietType) {
		this.dietType = dietType;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public String getDimention() {
		return dimention;
	}
	public void setDimention(String dimention) {
		this.dimention = dimention;
	}
	public List<String> getInfo() {
		return info;
	}
	public void setInfo(List<String> info) {
		this.info = info;
	}
	public String getWeightUnit() {
		return weightUnit;
	}
	public void setWeightUnit(String weightUnit) {
		this.weightUnit = weightUnit;
	}
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
}
