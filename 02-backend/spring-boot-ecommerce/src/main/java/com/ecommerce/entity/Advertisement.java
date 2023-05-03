package com.ecommerce.entity;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "advertisement")
@Getter
@Setter
public class Advertisement {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "customer_id")
	private Long customerId;
	
	@Column(name = "species")
	private String species;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "genus")
	private String genus;
	
	@Column(name = "age")
	private int age;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "img_url")
	private String imageUrl;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "date_created")
	@CreationTimestamp
	private Date dateCreated;
	
	@Column(name = "last_updated")
	@UpdateTimestamp
	private Date lastUpdated;
	
	
	
}
