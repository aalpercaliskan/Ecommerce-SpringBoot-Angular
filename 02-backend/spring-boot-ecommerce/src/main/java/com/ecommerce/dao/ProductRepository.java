package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
	
	Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
	
	@Query(value = "SELECT * FROM product WHERE category_id = ?1 ORDER BY RAND() LIMIT 4", nativeQuery = true)
    List<Product> findRandomCustomers(Long categoryId);

}
