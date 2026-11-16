package com.example.demo.repository;

import com.example.demo.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE " +
           "(LOWER(m.senderName) = LOWER(:u1) AND LOWER(m.receiverName) = LOWER(:u2)) OR " +
           "(LOWER(m.senderName) = LOWER(:u2) AND LOWER(m.receiverName) = LOWER(:u1)) " +
           "ORDER BY m.sentAt ASC")
    List<Message> findConversation(@Param("u1") String u1, @Param("u2") String u2);

    List<Message> findByReceiverNameIgnoreCaseOrderBySentAtDesc(String receiverName);

    long countByReceiverNameIgnoreCaseAndIsReadFalse(String receiverName);
}
