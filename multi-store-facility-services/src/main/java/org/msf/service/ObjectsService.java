package org.msf.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.bson.Document;
import org.msf.dao.ObjectsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.mongodb.client.result.DeleteResult;

@Service
public class ObjectsService {

	@Autowired
	private ObjectsDao objectsDao;
	
	public Object saveObjects(Map<String, Object> objects) {
		
		return objectsDao.persistObjects(bindInputParams(objects));
	}
	
	public List<Document> searchAllObjects() {
		
		return objectsDao.findAllObjects();
	}
	
	public DeleteResult deleteByFirstName(String firstName) {
		
		return objectsDao.deleteByFirstName(firstName);
	}
	
	private Document bindInputParams(Map<String, Object> objects) {
		
		Document document = new Document();
		
		//Marking orgName as Primary Key
		document.put("_id", UUID.randomUUID().toString().replaceAll("-", ""));
		
		for(String key: objects.keySet())
			document.append(key, objects.get(key));
		
		document.append("createdOn", 
				new SimpleDateFormat("dd-MM-yyyy hh:mm:ss").format(new Date()));
		
		return document;
	}
	
	@SuppressWarnings("unused")
	private Update bindUpdateParams(Map<String, Object> subAuaDetail) {

		Update update = new Update();
		
		for (String key : subAuaDetail.keySet()) {
			
			if (key.equals("orgName"))
				continue;
			
			Object object = subAuaDetail.get(key);
			
			if(key.equals("userId")) {
				update.set("updatedBy", Integer.parseInt(object.toString()));
			}
			else if (object instanceof Map) {
				@SuppressWarnings("unchecked")
				Map<String, Object> subData = (Map<String, Object>) object;
				for(String subKey: subData.keySet()) {

					//if(subKey.equals("amount"))
						//update.set(key+"."+subKey, getLong(subData.get(subKey)!=null ? subData.get(subKey).toString():"0"));
					//else
						update.set(key+"."+subKey, subData.get(subKey));
				}
			} else {
				update.set(key, (object==null?null:object.toString()));
			}
		}
		update.set("updatedOn", 
				new SimpleDateFormat("dd-MM-yyyy hh:mm:ss").format(new Date()));
		
		return update;
	}
}
