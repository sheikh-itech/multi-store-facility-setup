package org.msf.dao;

import java.util.List;

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
public class UserDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public User persistUser(User user) {
		
		if(!mongoTemplate.collectionExists(Constants.MSF_Customer)) {
			Index index = new Index();
			index.on("id", Sort.Direction.ASC).unique();
			mongoTemplate.indexOps(Constants.MSF_Customer).ensureIndex(index);
		}
		
		return mongoTemplate.insert(user, Constants.MSF_Users);
	}
	
	public List<User> fetchUserDetail(String username) {
		
		Query query = new Query().addCriteria(
			    new Criteria().orOperator(
			        Criteria.where("email").is(username),
			        Criteria.where("userId").is(username)
			    )
			);
		
		return mongoTemplate.find(query, User.class, Constants.MSF_Users);
	}
}
