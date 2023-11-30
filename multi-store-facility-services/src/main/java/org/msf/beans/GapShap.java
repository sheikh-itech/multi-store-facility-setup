package org.msf.beans;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

public class GapShap implements Serializable {

	private static final long serialVersionUID = 2L;
	
	@Id
	private long id;
	private String heading;
	private String desc;
	private String userEmail;	//Actual author of Gap-Shap
	private Date timestamp;
	private List<Comment> comments;
	private boolean isPublished;
	private boolean isStable;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getHeading() {
		return heading;
	}
	public void setHeading(String heading) {
		this.heading = heading;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public boolean isPublished() {
		return isPublished;
	}
	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}
	public boolean isStable() {
		return isStable;
	}
	public void setStable(boolean isStable) {
		this.isStable = isStable;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
}
