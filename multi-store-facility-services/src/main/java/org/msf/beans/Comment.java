package org.msf.beans;

import java.io.Serializable;

public class Comment implements Serializable {

	private static final long serialVersionUID = 1L;

	private String userEmail;
	private String commentDesc;
	private int likes;
	private int disLikes;
	private Comment subComments;
	
	
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getCommentDesc() {
		return commentDesc;
	}
	public void setCommentDesc(String commentDesc) {
		this.commentDesc = commentDesc;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getDisLikes() {
		return disLikes;
	}
	public void setDisLikes(int disLikes) {
		this.disLikes = disLikes;
	}
	public Comment getSubComments() {
		return subComments;
	}
	public void setSubComments(Comment subComments) {
		this.subComments = subComments;
	}
}
