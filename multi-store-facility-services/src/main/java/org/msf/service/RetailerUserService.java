package org.msf.service;

import java.util.List;

import org.msf.beans.Retailer;
import org.msf.dao.RetailerUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RetailerUserService {

	@Autowired
	private RetailerUserDao retailersDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	public Retailer addRetailer(Retailer retailer) {

		retailer.setPassword(encoder.encode(retailer.getPassword()));
		
		retailer.updateRetailerId();
		retailer = retailersDao.persistUser(retailer);
		retailer.setPassword(null);
		
		return retailer;
	}
	
	public Retailer getUserDetail(String username) {
		
		List<Retailer> retailers = retailersDao.fetchUserDetail(username);
		
		if(retailers.size()>1)
			return null;
		
		Retailer retailer = retailers.get(0);
		retailer.setPassword(null);
		
		return retailer;
	}
}
