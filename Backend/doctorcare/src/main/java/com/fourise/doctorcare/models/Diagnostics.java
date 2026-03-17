package com.fourise.doctorcare.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "diagnostics")
public class Diagnostics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String testName;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Double cost;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiagnosticsStatus status;

    @Column(nullable = false)
    private LocalDate bookingDate;

    private LocalDate completionDate;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(length = 1000)
    private String result;

    @Column(nullable = false)
    private Boolean paymentDone = false;

    @Column(length = 500)
    private String notes;

    // Constructors
    public Diagnostics() {
        this.createdAt = LocalDateTime.now();
        this.status = DiagnosticsStatus.PENDING;
    }

    public Diagnostics(Long userId, String testName, String description, Double cost, LocalDate bookingDate) {
        this();
        this.userId = userId;
        this.testName = testName;
        this.description = description;
        this.cost = cost;
        this.bookingDate = bookingDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
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
