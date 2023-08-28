package org.msf.service;

import java.util.List;

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
		
		if(user.isUseCustomId()) {
			String id = AdminUtil.generateId(user.getFirstName(), user.getLastName());
			user.setId(id);
			user.setUserId(id);
		} else {
			user.setId(user.getEmail());
			user.setUserId("");
		}
		user = userDao.persistUser(user);
		user.setPassword(null);
		
		return user;
	}
	
	public User getUserDetail(String username) {
		
		List<User> users = userDao.fetchUserDetail(username);
		
		if(users.size()>1)
			return null;
		
		User user = users.get(0);
		user.setPassword(null);
		
		return user;
	}
}
