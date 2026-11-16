package com.example.demo.controller;

import com.example.demo.model.Model3D;
import com.example.demo.model.WorkFolder;
import com.example.demo.repository.Model3DRepository;
import com.example.demo.repository.WorkFolderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/folders")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class WorkFolderController {

    private final WorkFolderRepository folderRepository;
    private final Model3DRepository modelRepository;

    public WorkFolderController(WorkFolderRepository folderRepository, Model3DRepository modelRepository) {
        this.folderRepository = folderRepository;
        this.modelRepository = modelRepository;
    }

    @GetMapping
    public ResponseEntity<List<WorkFolder>> getAllFolders() {
        return ResponseEntity.ok(folderRepository.findAll());
    }

    @GetMapping("/creator/{creatorName}")
    public ResponseEntity<List<WorkFolder>> getFoldersByCreator(@PathVariable String creatorName) {
        return ResponseEntity.ok(folderRepository.findByCreatorNameIgnoreCase(creatorName));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFolder> getFolderById(@PathVariable Long id) {
        return folderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkFolder> createFolder(@RequestBody WorkFolder folder) {
        WorkFolder saved = folderRepository.save(folder);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PostMapping("/{folderId}/models/{modelId}")
    public ResponseEntity<?> addModelToFolder(@PathVariable Long folderId, @PathVariable Long modelId) {
        var folderOpt = folderRepository.findById(folderId);
        var modelOpt = modelRepository.findById(modelId);

        if (folderOpt.isEmpty() || modelOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Carpeta o Modelo no encontrado"));
        }

        WorkFolder folder = folderOpt.get();
        Model3D model = modelOpt.get();

        if (!folder.getModels().contains(model)) {
            folder.getModels().add(model);
            folderRepository.save(folder);
        }

        return ResponseEntity.ok(folder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long id) {
        if (!folderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        folderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
