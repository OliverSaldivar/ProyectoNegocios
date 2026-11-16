package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String senderName; // Nombre del remitente (ej. "Carlos (Cliente)", "Oliver Saldívar (Creador)")

    @NotBlank
    @Column(nullable = false)
    private String receiverName; // Nombre del destinatario

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private Long relatedModelId; // Opcional: ID del modelo 3D sobre el cual consultan

    private String relatedModelTitle; // Título del modelo 3D para referencia rápida

    private LocalDateTime sentAt;

    @Builder.Default
    private Boolean isRead = false;

    @PrePersist
    protected void onCreate() {
        if (sentAt == null) {
            sentAt = LocalDateTime.now();
        }
        if (isRead == null) {
            isRead = false;
        }
    }
}
