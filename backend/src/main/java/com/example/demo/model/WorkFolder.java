package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "work_folders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkFolder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de la carpeta es obligatorio")
    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private String creatorName;

    private String coverImageUrl;

    private LocalDateTime createdAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "folder_models",
        joinColumns = @JoinColumn(name = "folder_id"),
        inverseJoinColumns = @JoinColumn(name = "model_id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @Builder.Default
    private List<Model3D> models = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
