	package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dao.ProductRepository;
import com.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	 @Autowired
	private ProductRepository productRepository;
	
	 @GetMapping("/related/{category_id}")
	public List<Product> placeOrder(@PathVariable("category_id") Long categoryId) {
		
		 return productRepository.findRandomCustomers(categoryId);
	}
		
	
}
