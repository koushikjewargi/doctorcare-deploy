package com.fourise.doctorcare.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "diagnostics")
public class Diagnostics {

    @Id
    private String id;

    private String userId;

    private String testName;

    private String description;

    private Double cost;

    private DiagnosticsStatus status;

    private LocalDate bookingDate;

    private LocalDate completionDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String result;

    private Boolean paymentDone = false;

    private String notes;

    // Constructors
    public Diagnostics() {
        this.createdAt = LocalDateTime.now();
        this.status = DiagnosticsStatus.PENDING;
    }

    public Diagnostics(String userId, String testName, String description, Double cost, LocalDate bookingDate) {
        this();
        this.userId = userId;
        this.testName = testName;
        this.description = description;
        this.cost = cost;
        this.bookingDate = bookingDate;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public DiagnosticsStatus getStatus() {
        return status;
    }

    public void setStatus(DiagnosticsStatus status) {
        this.status = status;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
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

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Boolean getPaymentDone() {
        return paymentDone;
    }

    public void setPaymentDone(Boolean paymentDone) {
        this.paymentDone = paymentDone;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Diagnostics{" +
                "id=" + id +
                ", userId=" + userId +
                ", testName='" + testName + '\'' +
                ", cost=" + cost +
                ", status=" + status +
                ", bookingDate=" + bookingDate +
                ", paymentDone=" + paymentDone +
                '}';
    }
}
