package org.msf.dao;

import java.util.List;

import org.msf.beans.Retailer;
import org.msf.beans.User;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class RetailerUserDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Retailer persistUser(Retailer user) {
		
		if(!mongoTemplate.collectionExists(Constants.MSF_Retailers)) {
			Index index = new Index();
			index.on("id", Sort.Direction.ASC).unique();
			mongoTemplate.indexOps(Constants.MSF_Retailers).ensureIndex(index);
		}
		
		return mongoTemplate.insert(user, Constants.MSF_Retailers);
	}
	
	public List<Retailer> fetchUserDetail(String username) {
		
		Query query = new Query().addCriteria(
				Criteria.where("email").is(username)
			);
		
		return mongoTemplate.find(query, Retailer.class, Constants.MSF_Retailers);
	}
}
