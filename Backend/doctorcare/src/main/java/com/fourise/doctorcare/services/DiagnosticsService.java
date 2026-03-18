package com.fourise.doctorcare.services;

import com.fourise.doctorcare.models.Diagnostics;
import com.fourise.doctorcare.models.DiagnosticsStatus;
import com.fourise.doctorcare.repositories.DiagnosticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DiagnosticsService {

    @Autowired
    private DiagnosticsRepository diagnosticsRepository;

    // Create or Book a new diagnostic test
    public Diagnostics bookDiagnosticTest(String userId, String testName, String description, Double cost, LocalDate bookingDate) {
        Diagnostics diagnostics = new Diagnostics(userId, testName, description, cost, bookingDate);
        return diagnosticsRepository.save(diagnostics);
    }

    // Get all diagnostic tests for a user
    public List<Diagnostics> getUserDiagnostics(String userId) {
        return diagnosticsRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // Get diagnostic test by ID
    public Optional<Diagnostics> getDiagnosticsById(String id) {
        return diagnosticsRepository.findById(id);
    }

    // Get diagnostic test by ID and userId for security
    public Optional<Diagnostics> getDiagnosticsByIdAndUserId(String id, String userId) {
        return diagnosticsRepository.findByIdAndUserId(id, userId);
    }

    // Get all diagnostics with a specific status
    public List<Diagnostics> getDiagnosticsByStatus(DiagnosticsStatus status) {
        return diagnosticsRepository.findByStatus(status);
    }

    // Get user's diagnostics with specific status
    public List<Diagnostics> getUserDiagnosticsByStatus(String userId, DiagnosticsStatus status) {
        return diagnosticsRepository.findByUserIdAndStatus(userId, status);
    }

    // Get diagnostics by booking date
    public List<Diagnostics> getDiagnosticsByBookingDate(LocalDate bookingDate) {
        return diagnosticsRepository.findByBookingDate(bookingDate);
    }

    // Get pending payment diagnostics for a user
    public List<Diagnostics> getPendingPaymentDiagnostics(String userId) {
        return diagnosticsRepository.findByUserIdAndPaymentDone(userId, false);
    }

    // Update diagnostic status
    public Diagnostics updateDiagnosticsStatus(String id, DiagnosticsStatus status) {
        Optional<Diagnostics> diagnostics = diagnosticsRepository.findById(id);
        if (diagnostics.isPresent()) {
            Diagnostics diag = diagnostics.get();
            diag.setStatus(status);
            diag.setUpdatedAt(LocalDateTime.now());
            if (status == DiagnosticsStatus.COMPLETED) {
                diag.setCompletionDate(LocalDate.now());
            }
            return diagnosticsRepository.save(diag);
        }
        return null;
    }

    // Add test results
    public Diagnostics addTestResults(String id, String result) {
        Optional<Diagnostics> diagnostics = diagnosticsRepository.findById(id);
        if (diagnostics.isPresent()) {
            Diagnostics diag = diagnostics.get();
            diag.setResult(result);
            diag.setStatus(DiagnosticsStatus.COMPLETED);
            diag.setCompletionDate(LocalDate.now());
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsRepository.save(diag);
        }
        return null;
    }

    // Update payment status
    public Diagnostics updatePaymentStatus(String id, Boolean paid) {
        Optional<Diagnostics> diagnostics = diagnosticsRepository.findById(id);
        if (diagnostics.isPresent()) {
            Diagnostics diag = diagnostics.get();
            diag.setPaymentDone(paid);
            diag.setUpdatedAt(LocalDateTime.now());
            if (paid) {
                diag.setStatus(DiagnosticsStatus.BOOKED);
            }
            return diagnosticsRepository.save(diag);
        }
        return null;
    }

    // Add notes
    public Diagnostics addNotes(String id, String notes) {
        Optional<Diagnostics> diagnostics = diagnosticsRepository.findById(id);
        if (diagnostics.isPresent()) {
            Diagnostics diag = diagnostics.get();
            diag.setNotes(notes);
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsRepository.save(diag);
        }
        return null;
    }

    // Cancel diagnostic test
    public Diagnostics cancelDiagnostics(String id) {
        Optional<Diagnostics> diagnostics = diagnosticsRepository.findById(id);
        if (diagnostics.isPresent()) {
            Diagnostics diag = diagnostics.get();
            diag.setStatus(DiagnosticsStatus.CANCELLED);
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsRepository.save(diag);
        }
        return null;
    }

    // Get history of completed diagnostics
    public List<Diagnostics> getCompletedDiagnostics(String userId) {
        return diagnosticsRepository.findByUserIdAndStatus(userId, DiagnosticsStatus.COMPLETED);
    }

    // Delete diagnostic record
    public boolean deleteDiagnostics(String id) {
        try {
            diagnosticsRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Count total diagnostics for user
    public long getUserDiagnosticsCount(String userId) {
        return diagnosticsRepository.countByUserId(userId);
    }

    // Get all diagnostics (no filters)
    public List<Diagnostics> getAllDiagnostics() {
        return diagnosticsRepository.findAll();
    }

    // Get total diagnostics with specific status
    public long getDiagnosticsCountByStatus(DiagnosticsStatus status) {
        return diagnosticsRepository.countByStatus(status);
    }
}
