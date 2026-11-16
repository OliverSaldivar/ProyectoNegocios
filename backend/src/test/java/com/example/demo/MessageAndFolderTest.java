package com.example.demo;

import com.example.demo.controller.MessageController;
import com.example.demo.controller.WorkFolderController;
import com.example.demo.model.Message;
import com.example.demo.model.WorkFolder;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.Model3DRepository;
import com.example.demo.repository.WorkFolderRepository;
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

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class MessageAndFolderTest {

    private MockMvc mockMvcFolder;
    private MockMvc mockMvcMessage;

    @Mock
    private WorkFolderRepository folderRepository;

    @Mock
    private Model3DRepository modelRepository;

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private WorkFolderController folderController;

    @InjectMocks
    private MessageController messageController;

    @BeforeEach
    void setUp() {
        mockMvcFolder = MockMvcBuilders.standaloneSetup(folderController).build();
        mockMvcMessage = MockMvcBuilders.standaloneSetup(messageController).build();
    }

    @Test
    void testGetFolders() throws Exception {
        WorkFolder f = WorkFolder.builder()
                .id(1L)
                .name("Colección Sci-Fi")
                .creatorName("Oliver Saldívar")
                .build();

        when(folderRepository.findAll()).thenReturn(List.of(f));

        mockMvcFolder.perform(get("/api/folders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Colección Sci-Fi")));
    }

    @Test
    void testCreateFolder() throws Exception {
        WorkFolder f = WorkFolder.builder()
                .id(2L)
                .name("Props y Armas")
                .creatorName("Oliver Saldívar")
                .build();

        when(folderRepository.save(any(WorkFolder.class))).thenReturn(f);

        String json = """
                {
                    "name": "Props y Armas",
                    "creatorName": "Oliver Saldívar"
                }
                """;

        mockMvcFolder.perform(post("/api/folders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name", is("Props y Armas")));
    }

    @Test
    void testGetConversation() throws Exception {
        Message msg = Message.builder()
                .id(1L)
                .senderName("Carlos (Cliente)")
                .receiverName("Oliver Saldívar")
                .content("Hola Oliver")
                .isRead(false)
                .build();

        when(messageRepository.findConversation("Carlos (Cliente)", "Oliver Saldívar"))
                .thenReturn(List.of(msg));

        mockMvcMessage.perform(get("/api/messages/conversation?user1=Carlos (Cliente)&user2=Oliver Saldívar"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].content", is("Hola Oliver")));
    }
}
