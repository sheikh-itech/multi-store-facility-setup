package org.msf.beans;

import java.io.Serializable;

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
}
