package com.example.demo.controller;

import com.example.demo.model.PurchaseOrder;
import com.example.demo.repository.PurchaseOrderRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class PurchaseOrderController {

    private final PurchaseOrderRepository orderRepository;

    public PurchaseOrderController(PurchaseOrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrder>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<PurchaseOrder>> getOrdersByUser(@PathVariable String username) {
        return ResponseEntity.ok(orderRepository.findByClientUsernameOrderByPurchasedAtDesc(username));
    }

    @PostMapping
    public ResponseEntity<PurchaseOrder> createOrder(@Valid @RequestBody PurchaseOrder order) {
        if (order.getOrderNumber() == null || order.getOrderNumber().isBlank()) {
            order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        PurchaseOrder saved = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
