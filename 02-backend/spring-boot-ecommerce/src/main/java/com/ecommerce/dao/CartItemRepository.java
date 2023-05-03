package com.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ecommerce.entity.CartItem;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "cartItem", path = "cart-item")
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	CartItem findByProductIdAndCustomerId(@Param("productId") String product_id, @Param("customerId") String customer_id);
	
	Page<CartItem> findByProductId(@Param("productId") String product_id, Pageable pageable);
}
