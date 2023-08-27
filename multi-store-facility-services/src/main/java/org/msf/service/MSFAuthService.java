package org.msf.service;

import org.msf.dao.MSFAuthDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Hapheej Sheikh
 * @since 1.0.0
 */

@Service
public class MSFAuthService implements UserDetailsService {

	@Autowired
	private MSFAuthDao authDao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		return authDao.authenticateUser(username);
	}
}
