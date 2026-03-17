package com.fourise.doctorcare.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diagnostics_payment")
public class DiagnosticsPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long diagnosticsId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    @Column(nullable = false)
    private String transactionId;

    @Column(nullable = false)
    private LocalDateTime paymentDate;

    @Column(length = 100)
    private String paymentMethod;

    @Column(length = 500)
    private String paymentDescription;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Constructors
    public DiagnosticsPayment() {
        this.createdAt = LocalDateTime.now();
        this.paymentStatus = PaymentStatus.PENDING;
    }

    public DiagnosticsPayment(Long diagnosticsId, Long userId, Double amount, String paymentMethod) {
        this();
        this.diagnosticsId = diagnosticsId;
        this.userId = userId;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDiagnosticsId() {
        return diagnosticsId;
    }

    public void setDiagnosticsId(Long diagnosticsId) {
        this.diagnosticsId = diagnosticsId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentDescription() {
        return paymentDescription;
    }

    public void setPaymentDescription(String paymentDescription) {
        this.paymentDescription = paymentDescription;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "DiagnosticsPayment{" +
                "id=" + id +
                ", diagnosticsId=" + diagnosticsId +
                ", userId=" + userId +
                ", amount=" + amount +
                ", paymentStatus=" + paymentStatus +
                ", transactionId='" + transactionId + '\'' +
                '}';
    }
}
