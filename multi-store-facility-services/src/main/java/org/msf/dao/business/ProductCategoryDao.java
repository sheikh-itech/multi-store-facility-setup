package org.msf.dao.business;

import java.util.List;

import org.msf.beans.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ProductCategoryDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Category persistCategory(Category category) {
		
		return mongoTemplate.insert(category);
	}
	
	public List<Category> fetchCategoryByName(String name) {
		
		Query query = new Query().addCriteria(Criteria.where("name").is(name));
		
		return mongoTemplate.find(query, Category.class);
	}

	public List<Category> fetchAllCategories() {
		
		return mongoTemplate.findAll(Category.class);
	}
}
