package com.swayambhu.grocery_management.product.service;

import java.util.ArrayList;
import java.util.List;

import com.swayambhu.grocery_management.dtoMapper.ApiResponse;
import com.swayambhu.grocery_management.product.dtoMapper.ProductRequestDto;
import com.swayambhu.grocery_management.product.dtoMapper.ProductResponseDto;

import jakarta.validation.Valid;

public interface ProductServiceInterface {
	void createProduct(ProductRequestDto request);
	ApiResponse updateProduct(ProductRequestDto request);
	List<ProductResponseDto> getProducts();
}
