package com.swayambhu.grocery_management.product.restController;

import com.swayambhu.grocery_management.dtoMapper.ApiResponse;
import com.swayambhu.grocery_management.product.dtoMapper.ProductRequestDto;
import com.swayambhu.grocery_management.product.dtoMapper.ProductResponseDto;
import com.swayambhu.grocery_management.product.enums.ProductStatus;
import com.swayambhu.grocery_management.product.enums.UnitType;
import com.swayambhu.grocery_management.product.service.impl.ProductService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createProduct(
            @Valid @RequestBody ProductRequestDto request
    ) {

        productService.createProduct(request);

        ApiResponse response = ApiResponse.builder()
                .status(true)
                .message("Product created successfully")
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
    
    
    @PostMapping("/update")
    public ResponseEntity<ApiResponse> updateProduct(
    		@Valid @RequestBody ProductRequestDto request
    		) {
    	
    	productService.updateProduct(request);
    	
    	ApiResponse response = ApiResponse.builder()
    			.status(true)
    			.message("Product updated successfully")
    			.build();
    	
    	return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/get")
    public List<ProductResponseDto> getProducts() {
    	
    	
//    	ApiResponse response = ApiResponse.builder()
//    			.status(true)
//    			.message("Product updated successfully")
//    			.build();
    	
    	return productService.getProducts();
    }
    
    @GetMapping("/statuses")
    public ResponseEntity<List<String>> getProductStatuses() {

        List<String> statuses = Arrays.stream(ProductStatus.values())
                .map(Enum::name)
                .toList();

        return ResponseEntity.ok(statuses);
    }
    
    @GetMapping("/unit-types")
    public ResponseEntity<List<String>> getUnitTypes() {
    	
    	List<String> unitTypes = Arrays.stream(UnitType.values())
    			.map(Enum::name)
    			.toList();
    	
    	return ResponseEntity.ok(unitTypes);
    }
    
}
