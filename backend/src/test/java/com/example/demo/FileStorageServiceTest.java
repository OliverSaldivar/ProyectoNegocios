package com.example.demo;

import com.example.demo.service.FileStorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

class FileStorageServiceTest {

    @TempDir
    Path tempDir;

    private FileStorageService fileStorageService;

    @BeforeEach
    void setUp() {
        fileStorageService = new FileStorageService(tempDir.toString());
    }

    @Test
    void testStoreFileSuccess() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "astronaut.glb",
                "model/gltf-binary",
                "binary content here".getBytes()
        );

        String storedUrl = fileStorageService.storeFile(file);
        assertNotNull(storedUrl);
        assertTrue(storedUrl.startsWith("/uploads/"));
        assertTrue(storedUrl.endsWith(".glb"));
    }

    @Test
    void testStoreFileInvalidExtension() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "malicious.exe",
                "application/octet-stream",
                "malicious code".getBytes()
        );

        assertThrows(IllegalArgumentException.class, () -> fileStorageService.storeFile(file));
    }

    @Test
    void testStoreFilePathTraversalSanitization() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "../../secret/model.glb",
                "model/gltf-binary",
                "binary content".getBytes()
        );

        String storedUrl = fileStorageService.storeFile(file);
        assertNotNull(storedUrl);
        // Debe renombrarse con un UUID seguro sin '..'
        assertFalse(storedUrl.contains(".."));
    }
}
