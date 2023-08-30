package org.msf.config;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
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
}
