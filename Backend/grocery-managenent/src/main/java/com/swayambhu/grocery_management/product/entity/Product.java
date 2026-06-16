package com.swayambhu.grocery_management.product.entity;


import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.swayambhu.grocery_management.product.enums.ProductStatus;

@Entity
@Table(
    name = "products",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_product_sku",
            columnNames = "sku"
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Product Information

    @Column(
        name = "product_name",
        nullable = false,
        length = 150
    )
    private String productName;

    @Column(
        nullable = false,
        length = 50
    )
    private String sku;

    @Column(
        name = "unit_type",
        nullable = false,
        length = 30
    )
    private String unitType;

    // Pricing

    @Column(
        name = "cost_price",
        nullable = false,
        precision = 10,
        scale = 2
    )
    private BigDecimal costPrice;

    @Column(
        name = "selling_price",
        nullable = false,
        precision = 10,
        scale = 2
    )
    private BigDecimal sellingPrice;

    @Column(
        name = "gst_percentage",
        precision = 5,
        scale = 2
    )
    private BigDecimal gstPercentage;

    // Inventory

    @Column(
        name = "stock_quantity",
        nullable = false
    )
    private Integer stockQuantity;

    @Column(
        name = "minimum_stock_alert",
        nullable = false
    )
    private Integer minimumStockAlert;

    @Enumerated(EnumType.STRING)
    @Column(
        nullable = false,
        length = 30
    )
    private ProductStatus status;

    @Column(
    	    name = "is_active",
    	    nullable = false
    	)
    	@Builder.Default
    	private Boolean isActive = true;
    
    // Audit Fields

    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(
        name = "created_by",
        nullable = false,
        updatable = false,
        length = 100
    )
    private String createdBy;

    @Column(
        name = "updated_by",
        length = 100
    )
    private String updatedBy;

    @PrePersist
    public void prePersist() {

        LocalDateTime now = LocalDateTime.now();

        this.createdAt = now;
        this.updatedAt = now;

        if (this.createdBy == null) {
            this.createdBy = "SYSTEM";
        }

        if (this.updatedBy == null) {
            this.updatedBy = "SYSTEM";
        }
    }

    @PreUpdate
    public void preUpdate() {

        this.updatedAt = LocalDateTime.now();

        if (this.updatedBy == null) {
            this.updatedBy = "SYSTEM";
        }
    }
}
