package org.msf.dao;

import org.msf.beans.Customer;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Customer persistCustomer(Customer customer) {
		
		if(!mongoTemplate.collectionExists(Constants.MSF_Customer)) {
			Index index = new Index();
			index.on("id", Sort.Direction.ASC).unique();
			mongoTemplate.indexOps(Constants.MSF_Customer).ensureIndex(index);
		}
		
		return mongoTemplate.insert(customer, Constants.MSF_Customer);
	}	
}
