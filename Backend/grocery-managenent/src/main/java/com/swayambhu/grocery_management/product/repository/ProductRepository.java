package com.swayambhu.grocery_management.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swayambhu.grocery_management.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	boolean existsBySku(String sku);

}
