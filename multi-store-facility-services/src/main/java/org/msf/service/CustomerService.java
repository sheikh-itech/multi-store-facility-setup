package org.msf.service;

import org.msf.beans.Customer;
import org.msf.dao.CustomerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

	@Autowired
	private CustomerDao customerDao;
	
	
	public Customer addCustomer(Customer customer) {

		return customerDao.persistCustomer(customer);
	}
}
