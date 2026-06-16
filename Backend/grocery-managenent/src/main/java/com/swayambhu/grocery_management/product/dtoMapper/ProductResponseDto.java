package com.swayambhu.grocery_management.product.dtoMapper;

import java.math.BigDecimal;

import com.swayambhu.grocery_management.product.enums.ProductStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDto {

    private Long id;

    private String productName;

    private String sku;

    private String unitType;

    private BigDecimal costPrice;

    private BigDecimal sellingPrice;

    private Integer stockQuantity;

    private Integer minimumStockAlert;

    private BigDecimal gstPercentage;

    private ProductStatus status;
}
