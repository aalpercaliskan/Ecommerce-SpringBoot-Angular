package com.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ecommerce.entity.OrderItem;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "orderItem", path = "order-item")
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{
 
}
