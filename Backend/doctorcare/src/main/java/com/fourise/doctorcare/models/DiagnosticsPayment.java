package com.fourise.doctorcare.models;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "diagnostics_payment")
public class DiagnosticsPayment {

    @Id
    private String id;

    private String diagnosticsId;

    private String userId;

    private Double amount;

    private PaymentStatus paymentStatus;

    private String transactionId;

    private LocalDateTime paymentDate;

    private String paymentMethod;

    private String paymentDescription;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Constructors
    public DiagnosticsPayment() {
        this.createdAt = LocalDateTime.now();
        this.paymentStatus = PaymentStatus.PENDING;
    }

    public DiagnosticsPayment(String diagnosticsId, String userId, Double amount, String paymentMethod) {
        this();
        this.diagnosticsId = diagnosticsId;
        this.userId = userId;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDiagnosticsId() {
        return diagnosticsId;
    }

    public void setDiagnosticsId(String diagnosticsId) {
        this.diagnosticsId = diagnosticsId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
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
