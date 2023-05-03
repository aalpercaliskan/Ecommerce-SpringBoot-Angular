package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ecommerce.entity.County;
import com.ecommerce.entity.State;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "counties", path = "counties")
public interface CountyRepository extends JpaRepository<County, Long> {
	
	List<County> findByCityId(@Param("id") String id);

}
