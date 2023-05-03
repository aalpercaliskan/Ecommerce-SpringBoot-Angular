package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ecommerce.entity.Advertisement;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
	
	Page<Advertisement> findByCustomerIdOrderByDateCreatedDesc(@Param("customerId") String customer_id, Pageable pageable);
	
	Page<Advertisement> findBySpeciesOrderByDateCreatedDesc(@Param("species") String species, Pageable pageable);
	
	Page<Advertisement> findByNameContaining(@Param("name") String name, Pageable pageable);

	@Query(value = "SELECT * FROM advertisement WHERE species = ?1 ORDER BY RAND() LIMIT 4", nativeQuery = true)
	List<Advertisement> findRelatedAdvertisements(String species);

}
