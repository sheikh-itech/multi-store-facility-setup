package org.msf.service;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

@Service
public class MongoTransactionalService {

	private final MongoTemplate mongoTemplate;
	private final TransactionTemplate transactionTemplate;
	
	@Autowired
    public MongoTransactionalService(MongoTemplate mongoTemplate, MongoTransactionManager transactionManager) {
        this.mongoTemplate = mongoTemplate;
        this.transactionTemplate = new TransactionTemplate(transactionManager);
    }
	
	public Object saveObjects(List<Object> documents) {
        return transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {

            	for(Object doc: documents)
            		mongoTemplate.insert(doc);
            }
        });
    }
	
	public Object updateObjects(List<Object> documents) {
		
        return transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {

            	for(Object doc: documents) {
            		Map<String, Object> data = bindUpdateObject(doc);
            		if(data!=null) {
            			try {
            				Query query = new Query(Criteria.where("_id").is(data.get("id")));
            				mongoTemplate.updateFirst(query, (Update)data.get("data"), (Class<?>)data.get("class"));
            			} catch(Exception ex) {
            				ex.printStackTrace();
            			}
            		}
            	}
            }
        });
    }
	
	public Object saveDocuments(List<Document> documents, String collectionName) {
        return transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {

            	for(Document doc: documents)
            		mongoTemplate.insert(doc, collectionName);
            }
        });
    }
	
	public void saveObjects(List<Object> documents, String collectionName) {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {

            	for(Object doc: documents)
            		mongoTemplate.insert(doc, collectionName);
            }
        });
    }
	
	/**
	 * @param objectToPersist
	 * Holds object with respective collection name
	 * @return last updated object
	 */
	public Object saveMapObjects(Map<Object, String> objectToPersist) {
        
		return transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {

            	for(Object doc: objectToPersist.keySet())
            		mongoTemplate.insert(doc, objectToPersist.get(doc));
            }
        });
    }
	
	private Map<String, Object> bindUpdateObject(Object object) {
		
		Map<String, Object> updateData = new HashMap<>();
		
		try {
			Class<?> clazz = object.getClass();
	        Field[] fields = clazz.getDeclaredFields();

	        updateData.put("class", clazz);
	        Update update = new Update();
	        for (Field field : fields) {
	        	
	        	if(field.getName().equals("serialVersionUID"))
	        		continue;
	        	
	        	field.setAccessible(true);
	        	
	        	if(field.getName().equals("_id") || field.getName().equals("id")) {
	        		updateData.put("id", field.get(object));
	        		continue;
	        	}
	        	//if(field.get(object)!=null && !field.get(object).toString().isBlank())
	        	update.set(field.getName(), field.get(object));
	        }
	        updateData.put("data", update);
		} catch(Exception ex) {
			return null;
		}
		return updateData;
	}
}
