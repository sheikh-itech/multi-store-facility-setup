package org.msf.dao.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.msf.beans.Product;
import org.msf.beans.ProductInfo;
import org.msf.beans.QrInfo;
import org.msf.service.MongoTransactionalService;
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
	@Autowired
	private MongoTransactionalService mongoTransService;
	
	
	public QrInfo saveQRCode(QrInfo qrInfo) {
		
		return mongoTemplate.insert(qrInfo);
	}
	
	public Product saveProductInfo(Product product) {
		
		return mongoTemplate.insert(product);
	}
	
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
	
	public Product findProductById(String id) {
		
		return mongoTemplate.findById(id, Product.class, Constants.MSF_Product);
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
	
	public List<ProductInfo> findQRCodeByName(String name) {
		
		List<ProductInfo> info = new ArrayList<>();
		
		Query query = new Query().addCriteria(Criteria.where("name").is(name));
		List<Product> products = mongoTemplate.find(query, Product.class, Constants.MSF_Product);
		if(products!=null) {
			products.forEach(prod->{
				QrInfo qrCodes = mongoTemplate.findById(prod.getId(), 
						QrInfo.class, Constants.MSF_QRCode);
				
				if(qrCodes!=null)
					info.add(new ProductInfo(prod.getId(), qrCodes.getQrBytes(), prod.getName(), 
							prod.getPrice(), prod.getDesc(), prod.getCategory(), prod.getDetail(), prod.isVerified()));
			});
			return info;
		}
		else
			return null;
	}
	
	public List<ProductInfo> findAllQRCodeInfo() {
		List<ProductInfo> info = new ArrayList<>();
		
		List<Product> products = mongoTemplate.findAll(Product.class, Constants.MSF_Product);
		products.forEach(prod->{
			QrInfo qrCodes = mongoTemplate.findById(prod.getId(), 
					QrInfo.class, Constants.MSF_QRCode);
			
			if(qrCodes!=null)
				info.add(new ProductInfo(prod.getId(), qrCodes.getQrBytes(), prod.getName(), 
						prod.getPrice(), prod.getDesc(), prod.getCategory(), prod.getDetail(), prod.isVerified()));
		});
		return info;
	}
}
