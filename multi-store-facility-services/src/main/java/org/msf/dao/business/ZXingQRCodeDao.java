package org.msf.dao.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.msf.beans.Product;
import org.msf.beans.ProductInfo;
import org.msf.beans.ProductQRInfo;
import org.msf.config.MongoTransactionalService;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ZXingQRCodeDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	@Autowired
	private MongoTransactionalService mongoTransService;
	
	public ProductQRInfo saveQRCode(ProductQRInfo qrInfo) {
		
		return mongoTemplate.insert(qrInfo);
	}
	
	public Product saveProductInfo(Product product) {
		
		return mongoTemplate.insert(product);
	}
	
	public void saveTransObjects(List<Object> objects) {

		mongoTransService.saveObjects(objects);
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

	public ProductQRInfo findQRCodeById(String id) {
		
		return mongoTemplate.findById(id, ProductQRInfo.class, Constants.MSF_QRCode);
	}
	
	public ProductQRInfo findQRCodeByName(String name) {
		
		Query query = new Query().addCriteria(Criteria.where("name").is(name));
		Product product = mongoTemplate.findOne(query, Product.class, Constants.MSF_Product);
		if(product!=null)
			return mongoTemplate.findById(product.getId(), ProductQRInfo.class, Constants.MSF_QRCode);
		else
			return null;
	}
	
	public List<ProductInfo> findALLQRCodeInfo() {
		List<ProductInfo> info = new ArrayList<>();
		
		List<Product> products = mongoTemplate.findAll(Product.class, Constants.MSF_Product);
		products.forEach(prod->{
			ProductQRInfo qrCodes = mongoTemplate.findById(prod.getId(), 
					ProductQRInfo.class, Constants.MSF_QRCode);
			info.add(new ProductInfo(prod.getId(), qrCodes.getQrBytes(), prod.getName(), 
					prod.getPrice(), prod.getDesc(), prod.getCode()));
		});
		return info;
	}
}
