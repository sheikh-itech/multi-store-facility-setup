package org.msf.service.business;

import java.util.List;

import org.msf.beans.Category;
import org.msf.dao.business.ProductCategoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductCategoryService {

	@Autowired
	private ProductCategoryDao categoryDao;
	
	public Category addCategory(Category category) {
		
		return categoryDao.persistCategory(category);
	}
	
	public List<Category> searchCategoryByName(String name) {
		
		return categoryDao.fetchCategoryByName(name);
	}

	public List<Category> searchAllCategory() {
		
		return categoryDao.fetchAllCategories();
	}
}
