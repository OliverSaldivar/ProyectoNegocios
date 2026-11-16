package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${app.upload.dir:uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("No se pudo crear el directorio de subidas: " + uploadDir, ex);
        }
    }

    public String storeFile(MultipartFile file) {
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "model.glb");

        // Validación de extensión segura para modelos 3D
        String lowerName = originalFilename.toLowerCase();
        if (!lowerName.endsWith(".glb") && !lowerName.endsWith(".gltf") && !lowerName.endsWith(".zip")) {
            throw new IllegalArgumentException("Formato no soportado. Solo se permiten .glb, .gltf y .zip");
        }

        // Sanitización con UUID único para prevenir sobreescritura y Path Traversal
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex);
        }
        String uniqueFileName = UUID.randomUUID().toString() + extension;

        try {
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            return "/uploads/" + uniqueFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Error al almacenar el archivo 3D: " + originalFilename, ex);
        }
    }

    public Path getFileStorageLocation() {
        return fileStorageLocation;
    }
}
