package org.msf.api.business;

import org.msf.beans.Category;
import org.msf.beans.Response;
import org.msf.service.business.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("products")
public class ProductCategoryApi {

	@Autowired
	private ProductCategoryService categoryService;
	
	@RequestMapping(value="/category", method=RequestMethod.POST)
	public ResponseEntity<Response> addCategory(@RequestBody Category category) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		try {
			if(category.getName()==null || category.getName().isBlank())
				throw new Exception("Invalid category name");
			res.setSuccess(true);
			res.setData(categoryService.addCategory(category));
			res.setMessage("Added category: "+category.getName());
			status = HttpStatus.CREATED;
		} catch(Exception ex) {
			if(ex.getMessage().contains("duplicate key")) {
				res.setMessage("Category already added");
				status = HttpStatus.BAD_REQUEST;
			} else if(ex.getMessage().contains("Invalid category name")) {
				res.setMessage("Invalid category name");
				status = HttpStatus.BAD_REQUEST;
			} else {
				res.setMessage("Failed to add category: "+ex.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
			res.setSuccess(false);
		}
		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/category/search/{name}", method=RequestMethod.GET)
	public ResponseEntity<Response> searchCategoryByName(@PathVariable("name") String name) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		try {
			res.setData(categoryService.searchCategoryByName(name));
			res.setSuccess(true);
			res.setMessage("Details of category: "+name);
		} catch(Exception ex) {
			res.setSuccess(false);
			res.setMessage("Failed to search category");
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/category/search/all", method=RequestMethod.GET)
	public ResponseEntity<Response> searchAllCategories() {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		try {
			res.setData(categoryService.searchAllCategory());
			res.setSuccess(true);
			res.setMessage("All available categories");
		} catch(Exception ex) {
			res.setSuccess(false);
			res.setMessage("Failed to search all categories");
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
}
