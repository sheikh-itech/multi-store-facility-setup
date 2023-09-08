package org.msf.beans;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import org.msf.utils.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.StringUtils;

@Document(collection = Constants.MSF_Category)
public class Category implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	private String name;
	private String desc;
	private List<String> items;
	
	public Category() {
		this.id = UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = StringUtils.capitalize(desc);
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.id = StringUtils.capitalize(name);
		this.name = StringUtils.capitalize(name);
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<String> getItems() {
		return items;
	}
	public void setItems(List<String> items) {
		this.items = items;
	}
}
