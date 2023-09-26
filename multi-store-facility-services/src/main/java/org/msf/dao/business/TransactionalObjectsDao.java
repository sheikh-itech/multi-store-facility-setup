package org.msf.dao.business;

import java.util.List;
import java.util.Map;

import org.msf.service.MongoTransactionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TransactionalObjectsDao {

	@Autowired
	private MongoTransactionalService mongoTransService;
	
	
	public void saveTransObjects(List<Object> objects) {

		mongoTransService.saveObjects(objects);
	}
	
	public void updateTransObjects(List<Object> objects) {

		mongoTransService.updateObjects(objects);
	}
	
	public void saveTransObjects(List<Object> objects, String collection) {

		mongoTransService.saveObjects(objects, collection);
	}
	
	public Object saveObjects(Map<Object, String> products) {

		return mongoTransService.saveMapObjects(products);
	}
}
