package com.example.demo.controller;

import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(
            @RequestParam String user1,
            @RequestParam String user2
    ) {
        List<Message> messages = messageRepository.findConversation(user1, user2);
        // Marcamos como leídos los mensajes dirigidos a user1 provenientes de user2
        messages.forEach(m -> {
            if (m.getReceiverName().equalsIgnoreCase(user1) && !m.getIsRead()) {
                m.setIsRead(true);
                messageRepository.save(m);
            }
        });
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@RequestParam String user) {
        long count = messageRepository.countByReceiverNameIgnoreCaseAndIsReadFalse(user);
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        Message saved = messageRepository.save(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
