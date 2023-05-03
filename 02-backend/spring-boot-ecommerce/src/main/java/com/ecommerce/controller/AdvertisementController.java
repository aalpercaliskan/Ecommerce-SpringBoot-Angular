package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dao.AdvertisementRepository;
import com.ecommerce.entity.Advertisement;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/advertisements")
public class AdvertisementController {
	 @Autowired
		private AdvertisementRepository advertisementRepository;
		
		 @GetMapping("/related/{species}")
		public List<Advertisement> placeOrder(@PathVariable("species") String species) {
			
			 return advertisementRepository.findRelatedAdvertisements(species);
		}

}
