package com.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;


@Configuration
public class DataRestConfig implements RepositoryRestConfigurer{
	
	@Value("${allowed.origins}")
	private String[] allowedOrigins;
	
	private EntityManager entityManager;
	
	@Autowired
	public DataRestConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		
		HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PATCH};
		
		disableHttpMethods(Product.class, config, unsupportedActions);
		disableHttpMethods(ProductCategory.class, config, unsupportedActions);
		disableHttpMethods(Country.class, config, unsupportedActions);
		disableHttpMethods(State.class, config, unsupportedActions);
		disableHttpMethods(Order.class, config, unsupportedActions);
		
		//call an internal helper method
		exposeIds(config);
		
		// configure cors mapping
		//cors.addMapping("http:localhost:8080/api/**").allowedOrigins(allowedOrigins);
		
	}

	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
		config.getExposureConfiguration()
		.forDomainType(theClass)
		.withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
		.withCollectionExposure((metData, httpMethods) -> httpMethods.disable(unsupportedActions));
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		
		//get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		//create an array of the entity types
		List<Class> entityClasses = new ArrayList<>();
		
		//get the entity types for for the entitites
		for (EntityType entityType : entities) {
			entityClasses.add(entityType.getJavaType());
		}
		
		//expose the entity ids for the arrar of entity types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
		
	}

	
}
