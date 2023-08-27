package org.msf.exc;

public class DuplicateUsernameException extends Exception {

	private static final long serialVersionUID = 1L;

	public DuplicateUsernameException(String message) {
		super(message);
	}
}
