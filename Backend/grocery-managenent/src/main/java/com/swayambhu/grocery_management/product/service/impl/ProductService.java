package com.swayambhu.grocery_management.product.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.swayambhu.grocery_management.dtoMapper.ApiResponse;
import com.swayambhu.grocery_management.product.dtoMapper.ProductRequestDto;
import com.swayambhu.grocery_management.product.dtoMapper.ProductResponseDto;
import com.swayambhu.grocery_management.product.entity.Product;
import com.swayambhu.grocery_management.product.repository.ProductRepository;
import com.swayambhu.grocery_management.product.service.ProductServiceInterface;

import jakarta.validation.Valid;

@Service
public class ProductService implements ProductServiceInterface {

	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Override
	public void createProduct(ProductRequestDto request) {

		if (productRepository.existsBySku(request.getSku())) {
			throw new RuntimeException("SKU already exists");
		}

		Product product = Product.builder().productName(request.getProductName()).sku(request.getSku())
				.unitType(request.getUnitType()).costPrice(request.getCostPrice())
				.sellingPrice(request.getSellingPrice()).stockQuantity(request.getStockQuantity())
				.minimumStockAlert(request.getMinimumStockAlert()).gstPercentage(request.getGstPercentage())
				.status(request.getStatus()).build();

		productRepository.save(product);
	}

	@Override
	public ApiResponse updateProduct(ProductRequestDto request) {

		Product product = productRepository.findById(request.getId())
				.orElseThrow(() -> new RuntimeException("Product not found"));

		product.setProductName(request.getProductName());

		product.setSku(request.getSku());

		product.setUnitType(request.getUnitType());

		product.setCostPrice(request.getCostPrice());

		product.setSellingPrice(request.getSellingPrice());

		product.setStockQuantity(request.getStockQuantity());

		product.setMinimumStockAlert(request.getMinimumStockAlert());

		product.setGstPercentage(request.getGstPercentage());

		product.setStatus(request.getStatus());

		productRepository.save(product);

		return ApiResponse.builder().status(true).message("Product updated successfully").build();
	}

	@Override
	public List<ProductResponseDto> getProducts() {

		return productRepository.findAll().stream().map(product -> {

			ProductResponseDto dto = new ProductResponseDto();

			dto.setId(product.getId());

			dto.setProductName(product.getProductName());

			dto.setSku(product.getSku());

			dto.setUnitType(product.getUnitType());

			dto.setCostPrice(product.getCostPrice());

			dto.setSellingPrice(product.getSellingPrice());

			dto.setStockQuantity(product.getStockQuantity());

			dto.setMinimumStockAlert(product.getMinimumStockAlert());

			dto.setGstPercentage(product.getGstPercentage());

			dto.setStatus(product.getStatus());

			return dto;

		}).toList();
	}

}
