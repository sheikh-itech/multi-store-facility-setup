package org.msf.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

import com.mongodb.client.MongoClient;

@Configuration
@Order(1)
public class MSFConfiguration {

	private static final Logger logger = LogManager.getLogger(MSFConfiguration.class);
	
	@Value("${spring.data.mongodb.database}")
	private String database;
	
	@Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
		
		if(database==null || database.isBlank())
			database = Constants.MSF_DB;
		
        return new MongoTemplate(mongoClient, database);
    }
	
	@Bean
    public GridFsOperations gridFsOperations(MongoTemplate mongoTemplate) {
		
		logger.info("Configuring GridFS");
        return new GridFsTemplate(mongoTemplate.getMongoDatabaseFactory(), mongoTemplate.getConverter());
    }
}
