package com.fourise.doctorcare.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "diagnostics_booking")
public class DiagnosticsBooking {

    @Id
    private String id;

    private String diagnosticsId;

    private String userId;

    private LocalDate appointmentDate;

    private LocalTime appointmentTime;

    private String location;

    private BookingStatus bookingStatus;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String patientNotes;

    // Constructors
    public DiagnosticsBooking() {
        this.createdAt = LocalDateTime.now();
        this.bookingStatus = BookingStatus.SCHEDULED;
    }

    public DiagnosticsBooking(String diagnosticsId, String userId, LocalDate appointmentDate, LocalTime appointmentTime) {
        this();
        this.diagnosticsId = diagnosticsId;
        this.userId = userId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
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

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
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

    public String getPatientNotes() {
        return patientNotes;
    }

    public void setPatientNotes(String patientNotes) {
        this.patientNotes = patientNotes;
    }

    @Override
    public String toString() {
        return "DiagnosticsBooking{" +
                "id=" + id +
                ", diagnosticsId=" + diagnosticsId +
                ", userId=" + userId +
                ", appointmentDate=" + appointmentDate +
                ", appointmentTime=" + appointmentTime +
                ", bookingStatus=" + bookingStatus +
                '}';
    }
}
