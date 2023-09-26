package org.msf.service.business;

import java.util.List;

import org.msf.beans.ProductInfo;
import org.msf.dao.business.ProductDetailDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductDetailService {

	@Autowired
	private ProductDetailDao productDetailDao;

	/**
	 * @param isPublic- true for not admin access, false for generating/updating info
	 */
	public List<ProductInfo> findProductInfoByName(String name, boolean isPublic) {
		
		if(name==null || name.isEmpty())
			return null;
		
		return productDetailDao.findProductInfoByName(name, isPublic);
	}
	
	/**
	 * @param isPublic- true for not admin access, false for generating/updating info
	 */
	public List<ProductInfo> findAllProductsInfo(boolean isPublic) {
		
		return productDetailDao.findAllProductsInfo(isPublic);
	}
}
