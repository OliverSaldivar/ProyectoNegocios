package com.example.demo;

import com.example.demo.controller.Model3DController;
import com.example.demo.model.Model3D;
import com.example.demo.repository.Model3DRepository;
import com.example.demo.service.FileStorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class Model3DControllerTest {

    private MockMvc mockMvc;

    @Mock
    private Model3DRepository repository;

    @Mock
    private FileStorageService fileStorageService;

    @InjectMocks
    private Model3DController controller;

    private Model3D sampleModel;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();

        sampleModel = Model3D.builder()
                .id(1L)
                .title("Astronauta Espacial")
                .description("Modelo de prueba")
                .category("Personajes")
                .polygonCount(28500)
                .price(29.99)
                .creatorName("Oliver Saldívar")
                .fileUrl("https://example.com/test.glb")
                .build();
    }

    @Test
    void testGetAllModels() throws Exception {
        when(repository.findAll()).thenReturn(List.of(sampleModel));

        mockMvc.perform(get("/api/models")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("Astronauta Espacial")));
    }

    @Test
    void testGetModelByIdFound() throws Exception {
        when(repository.findById(1L)).thenReturn(Optional.of(sampleModel));

        mockMvc.perform(get("/api/models/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("Astronauta Espacial")));
    }

    @Test
    void testGetModelByIdNotFound() throws Exception {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/models/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testSearchModels() throws Exception {
        when(repository.searchModels(any(), any(), any())).thenReturn(List.of(sampleModel));

        mockMvc.perform(get("/api/models?query=Astronauta&category=Personajes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].category", is("Personajes")));
    }
}
