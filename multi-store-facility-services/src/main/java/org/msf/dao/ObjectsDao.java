package org.msf.dao;

import java.util.List;

import org.bson.Document;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.DeleteResult;

@Repository
public class ObjectsDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Document persistObjects(Document document) {
		
		return mongoTemplate.insert(document, Constants.MSF_Collection);
	}
	
	public List<Document> findAllObjects() {
		
		Query query = new Query();
	    return mongoTemplate.find(query, Document.class, Constants.MSF_Collection);
	}
	
	public DeleteResult deleteByFirstName(String firstName) {
		
		Query query = new Query().addCriteria(Criteria.where("firstName").is(firstName));
		
		return mongoTemplate.remove(query, Constants.MSF_Collection);
	}
}
