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
@Table(name = "models_3d")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Model3D {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "La categoría es obligatoria")
    private String category; // Personajes, Vehículos, Arquitectura, Armas, Props, Criaturas

    @NotNull(message = "El conteo de polígonos es obligatorio")
    private Integer polygonCount;

    private Integer vertexCount;

    @NotNull(message = "El precio es obligatorio")
    private Double price; // 0.0 para modelos gratuitos

    private Boolean isRigged;

    private Boolean isAnimated;

    private Boolean hasPbr;

    @Column(nullable = false)
    private String fileUrl; // Ruta del archivo .glb / .gltf

    private String thumbnailUrl;

    private String creatorName;

    private String licenseType; // CC0, Comercial, Editorial

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (isRigged == null) isRigged = false;
        if (isAnimated == null) isAnimated = false;
        if (hasPbr == null) hasPbr = true;
        if (licenseType == null) licenseType = "Comercial Standard";
    }
}
