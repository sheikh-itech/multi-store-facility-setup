package org.msf.dao.business;

import org.msf.beans.QrInfo;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;

@Repository
public class ZXingQRCodeDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	public QrInfo saveQRCode(QrInfo qrInfo) {
		
		return mongoTemplate.insert(qrInfo);
	}

	public QrInfo findQRCodeById(String id) {
		
		return mongoTemplate.findById(id, QrInfo.class, Constants.MSF_QRCode);
	}
	
	public UpdateResult verifyQrInfo(String id, boolean verified) {
		
		Query query = new Query().addCriteria(Criteria.where("_id").is(id));
		
		Update update = new Update();
		update.set("verified", verified);
		
		return mongoTemplate.updateFirst(query, update, Constants.MSF_Product);
	}
}
