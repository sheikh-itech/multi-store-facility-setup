package org.msf.service;

import org.msf.beans.User;
import org.msf.dao.UserDao;
import org.msf.utils.AdminUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	public User addUser(User user) {

		user.setPassword(encoder.encode(user.getPassword()));
		
		String id = AdminUtil.generateId(user.getEmail(), user.getFirstName(), user.getLastName(), user.getDob());
		
		user.setId(id);
		
		return userDao.persistUser(user);
	}
}
