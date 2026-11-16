package com.example.demo.controller;

import com.example.demo.model.Model3D;
import com.example.demo.repository.Model3DRepository;
import com.example.demo.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/models")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class Model3DController {

    private final Model3DRepository repository;
    private final FileStorageService fileStorageService;

    public Model3DController(Model3DRepository repository, FileStorageService fileStorageService) {
        this.repository = repository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<List<Model3D>> getAllModels(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer maxPolygons
    ) {
        if ((query != null && !query.isBlank()) || (category != null && !category.isBlank()) || maxPolygons != null) {
            String cat = (category != null && !category.equalsIgnoreCase("Todos")) ? category : null;
            return ResponseEntity.ok(repository.searchModels(query, cat, maxPolygons));
        }
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Model3D> getModelById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/creator/{creatorName}")
    public ResponseEntity<List<Model3D>> getModelsByCreator(@PathVariable String creatorName) {
        List<Model3D> creatorModels = repository.findAll().stream()
                .filter(m -> m.getCreatorName() != null && m.getCreatorName().equalsIgnoreCase(creatorName))
                .toList();
        return ResponseEntity.ok(creatorModels);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createModel(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("polygonCount") Integer polygonCount,
            @RequestParam(value = "vertexCount", required = false) Integer vertexCount,
            @RequestParam("price") Double price,
            @RequestParam(value = "isRigged", defaultValue = "false") Boolean isRigged,
            @RequestParam(value = "isAnimated", defaultValue = "false") Boolean isAnimated,
            @RequestParam(value = "hasPbr", defaultValue = "true") Boolean hasPbr,
            @RequestParam(value = "creatorName", defaultValue = "Oliver Saldívar") String creatorName,
            @RequestParam(value = "licenseType", defaultValue = "Comercial Standard") String licenseType,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            String fileUrl = fileStorageService.storeFile(file);

            Model3D model = Model3D.builder()
                    .title(title)
                    .description(description)
                    .category(category)
                    .polygonCount(polygonCount)
                    .vertexCount(vertexCount != null ? vertexCount : (polygonCount / 2))
                    .price(price)
                    .isRigged(isRigged)
                    .isAnimated(isAnimated)
                    .hasPbr(hasPbr)
                    .creatorName(creatorName)
                    .licenseType(licenseType)
                    .fileUrl(fileUrl)
                    .thumbnailUrl(fileUrl)
                    .build();

            Model3D saved = repository.save(model);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateModel(@PathVariable Long id, @RequestBody Model3D updated) {
        return repository.findById(id)
                .map(model -> {
                    if (updated.getTitle() != null) model.setTitle(updated.getTitle());
                    if (updated.getDescription() != null) model.setDescription(updated.getDescription());
                    if (updated.getCategory() != null) model.setCategory(updated.getCategory());
                    if (updated.getPrice() != null) model.setPrice(updated.getPrice());
                    if (updated.getPolygonCount() != null) model.setPolygonCount(updated.getPolygonCount());
                    if (updated.getIsRigged() != null) model.setIsRigged(updated.getIsRigged());
                    if (updated.getIsAnimated() != null) model.setIsAnimated(updated.getIsAnimated());
                    Model3D saved = repository.save(model);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<?> downloadModel(@PathVariable Long id) {
        var modelOpt = repository.findById(id);
        if (modelOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Model3D model = modelOpt.get();
        try {
            // Si es un archivo local en /uploads/
            if (model.getFileUrl().startsWith("/uploads/")) {
                String fileName = model.getFileUrl().replace("/uploads/", "");
                Path filePath = fileStorageService.getFileStorageLocation().resolve(fileName).normalize();
                Resource resource = new UrlResource(filePath.toUri());

                if (resource.exists() && resource.isReadable()) {
                    return ResponseEntity.ok()
                            .contentType(MediaType.parseMediaType("model/gltf-binary"))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + model.getTitle().replaceAll("\\s+", "_") + ".glb\"")
                            .body(resource);
                }
            }
            // Si es una URL externa de prueba
            return ResponseEntity.ok(Map.of("downloadUrl", model.getFileUrl()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al procesar la descarga: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModel(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
