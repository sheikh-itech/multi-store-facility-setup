package org.msf.dao.business;

import java.util.ArrayList;
import java.util.List;

import org.msf.beans.Product;
import org.msf.beans.ProductInfo;
import org.msf.beans.QrInfo;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ProductDetailDao {

	@Autowired
	private MongoTemplate mongoTemplate;

	
	public Product saveProductInfo(Product product) {
		
		return mongoTemplate.insert(product);
	}
	
	public Product findProductById(String id) {
		
		return mongoTemplate.findById(id, Product.class, Constants.MSF_Product);
	}
	
	public List<ProductInfo> findProductInfoByName(String name, boolean isPublic) {

		List<ProductInfo> info = new ArrayList<>();

		Query query = new Query().addCriteria(Criteria.where("name").is(name));
		List<Product> products = mongoTemplate.find(query, Product.class, Constants.MSF_Product);
		if (products != null) {
			products.forEach(prod -> {
				if(isPublic) {
					info.add(new ProductInfo(prod.getId(), null, prod.getName(), prod.getPrice(),
							prod.getDesc(), prod.getCategory(), prod.getDetail(), prod.isVerified()));
				} else {
					QrInfo qrCodes = mongoTemplate.findById(prod.getId(), QrInfo.class, Constants.MSF_QRCode);

					if (qrCodes != null)
						info.add(new ProductInfo(prod.getId(), qrCodes.getQrBytes(), prod.getName(), prod.getPrice(),
								prod.getDesc(), prod.getCategory(), prod.getDetail(), prod.isVerified()));
				}
			});
			return info;
		} else
			return null;
	}

	public List<ProductInfo> findAllProductsInfo(boolean isPublic) {
		
		List<ProductInfo> info = new ArrayList<>();

		List<Product> products = mongoTemplate.findAll(Product.class, Constants.MSF_Product);
		products.forEach(prod -> {
			if(isPublic) {
				info.add(new ProductInfo(prod.getId(), null, prod.getName(), prod.getPrice(),
						prod.getDesc(), prod.getCategory(), prod.getDetail(), prod.isVerified()));
			} else {
				QrInfo qrCodes = mongoTemplate.findById(prod.getId(), QrInfo.class, Constants.MSF_QRCode);

				if (qrCodes != null)
					info.add(new ProductInfo(prod.getId(), qrCodes.getQrBytes(), prod.getName(), prod.getPrice(),
							prod.getDesc(), prod.getCategory(), prod.getDetail(), prod.isVerified()));
			}
		});
		return info;
	}
}
