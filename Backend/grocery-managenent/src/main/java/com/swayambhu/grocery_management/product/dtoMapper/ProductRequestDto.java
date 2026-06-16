package com.swayambhu.grocery_management.product.dtoMapper;

import com.swayambhu.grocery_management.product.enums.ProductStatus;

import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductRequestDto {

	@NotNull
    private Long id;
	
    @NotBlank(message = "Product name is required")
    private String productName;

    @NotBlank(message = "SKU is required")
    private String sku;

    @NotBlank(message = "Unit type is required")
    private String unitType;

    @NotNull(message = "Cost price is required")
    @Positive
    private BigDecimal costPrice;

    @NotNull(message = "Selling price is required")
    @Positive
    private BigDecimal sellingPrice;

    @NotNull(message = "Stock quantity is required")
    @Min(0)
    private Integer stockQuantity;

    @NotNull(message = "Minimum stock alert is required")
    @Min(0)
    private Integer minimumStockAlert;

    @DecimalMin(value = "0.00", message = "GST cannot be negative")
    @DecimalMax(value = "100.00", message = "GST cannot exceed 100")
    private BigDecimal gstPercentage;

    @NotNull(message = "Status is required")
    private ProductStatus status;
}