package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String orderNumber; // Ej. "ORD-2026-9821"

    @NotBlank
    @Column(nullable = false)
    private String clientUsername;

    @NotNull
    @Column(nullable = false)
    private Long modelId;

    @NotBlank
    @Column(nullable = false)
    private String modelTitle;

    @NotNull
    @Column(nullable = false)
    private Double pricePaid;

    @NotBlank
    @Column(nullable = false)
    private String licenseType;

    private LocalDateTime purchasedAt;

    @PrePersist
    protected void onCreate() {
        if (purchasedAt == null) {
            purchasedAt = LocalDateTime.now();
        }
        if (orderNumber == null) {
            orderNumber = "ORD-" + System.currentTimeMillis();
        }
    }
}
