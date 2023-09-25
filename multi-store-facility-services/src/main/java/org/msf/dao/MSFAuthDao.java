package org.msf.dao;

import java.util.List;

import org.msf.beans.User;
import org.msf.beans.UserDetail;
import org.msf.utils.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class MSFAuthDao {

	private static final Logger logger = LoggerFactory.getLogger(MSFAuthDao.class);
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public UserDetail authenticateUser(String username) {

		try {
			
			//Query query = new Query().addCriteria(Criteria.where("username").is(username));
			Query query = new Query().addCriteria(
				    new Criteria().orOperator(
				        Criteria.where("email").is(username),
				        Criteria.where("userId").is(username)
				    )
				);
			
			List<User> outcome = mongoTemplate.find(query, User.class, Constants.MSF_Users);
			
			if(outcome.size()>1)
				return null;
			else {
				User user = outcome.get(0);
				
				UserDetail detail = new UserDetail();
				detail.setUsername(username);
				detail.setEnabled(true);
				detail.setAccountExpired(false);
				detail.setAccountLocked(false);
				detail.setCredentialsExpired(false);
				detail.setEmail(user.getEmail());
				detail.setPassword(user.getPassword());
				detail.setUserId(user.getId());
				
				return detail;
			}

		} catch (Exception ex) {
			logger.error("User Detail Not Found, username: "+username+", error: " + ex.getMessage());
		}
		return null;
	}
}
