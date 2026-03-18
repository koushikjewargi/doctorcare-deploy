package com.fourise.doctorcare.controllers;

import com.fourise.doctorcare.models.Diagnostics;
import com.fourise.doctorcare.models.DiagnosticsStatus;
import com.fourise.doctorcare.services.DiagnosticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diagnostics")
@CrossOrigin(origins = "*")
public class DiagnosticsController {

    @Autowired
    private DiagnosticsService diagnosticsService;

    // Book a new diagnostic test
    @PostMapping("/book")
    public ResponseEntity<?> bookDiagnostic(
            @RequestParam String userId,
            @RequestParam String testName,
            @RequestParam(required = false) String description,
            @RequestParam Double cost,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate bookingDate) {
        try {
            Diagnostics diagnostics = diagnosticsService.bookDiagnosticTest(userId, testName, description, cost, bookingDate);
            return ResponseEntity.status(HttpStatus.CREATED).body(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error booking diagnostic: " + e.getMessage());
        }
    }

    // Get all diagnostics for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserDiagnostics(@PathVariable String userId) {
        try {
            List<Diagnostics> diagnostics = diagnosticsService.getUserDiagnostics(userId);
            return ResponseEntity.ok(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostics: " + e.getMessage());
        }
    }

    // Get diagnostic by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getDiagnosticsById(@PathVariable String id) {
        try {
            Optional<Diagnostics> diagnostics = diagnosticsService.getDiagnosticsById(id);
            if (diagnostics.isPresent()) {
                return ResponseEntity.ok(diagnostics.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostic: " + e.getMessage());
        }
    }

    // Get diagnostic by ID and userId
    @GetMapping("/{id}/user/{userId}")
    public ResponseEntity<?> getDiagnosticsByIdAndUserId(@PathVariable String id, @PathVariable String userId) {
        try {
            Optional<Diagnostics> diagnostics = diagnosticsService.getDiagnosticsByIdAndUserId(id, userId);
            if (diagnostics.isPresent()) {
                return ResponseEntity.ok(diagnostics.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found for this user");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostic: " + e.getMessage());
        }
    }

    // Get diagnostics by status
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getDiagnosticsByStatus(@PathVariable DiagnosticsStatus status) {
        try {
            List<Diagnostics> diagnostics = diagnosticsService.getDiagnosticsByStatus(status);
            return ResponseEntity.ok(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostics: " + e.getMessage());
        }
    }

    // Get user diagnostics by status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<?> getUserDiagnosticsByStatus(@PathVariable String userId, @PathVariable DiagnosticsStatus status) {
        try {
            List<Diagnostics> diagnostics = diagnosticsService.getUserDiagnosticsByStatus(userId, status);
            return ResponseEntity.ok(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostics: " + e.getMessage());
        }
    }

    // Get diagnostics by date
    @GetMapping("/date/{date}")
    public ResponseEntity<?> getDiagnosticsByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<Diagnostics> diagnostics = diagnosticsService.getDiagnosticsByBookingDate(date);
            return ResponseEntity.ok(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostics: " + e.getMessage());
        }
    }

    // Get pending payment diagnostics for user
    @GetMapping("/user/{userId}/pending-payment")
    public ResponseEntity<?> getPendingPaymentDiagnostics(@PathVariable String userId) {
        try {
            List<Diagnostics> diagnostics = diagnosticsService.getPendingPaymentDiagnostics(userId);
            return ResponseEntity.ok(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostics: " + e.getMessage());
        }
    }

    // Get all diagnostics (admin use or general list)
    @GetMapping("")
    public ResponseEntity<?> getAllDiagnostics() {
        try {
            List<Diagnostics> diagnostics = diagnosticsService.getAllDiagnostics();
            return ResponseEntity.ok(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching diagnostics: " + e.getMessage());
        }
    }

    // Update diagnostic status
    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<?> updateDiagnosticsStatus(@PathVariable String id, @PathVariable DiagnosticsStatus status) {
        try {
            Diagnostics diagnostics = diagnosticsService.updateDiagnosticsStatus(id, status);
            if (diagnostics != null) {
                return ResponseEntity.ok(diagnostics);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating diagnostic: " + e.getMessage());
        }
    }

    // Add test results
    @PutMapping("/{id}/result")
    public ResponseEntity<?> addTestResults(@PathVariable String id, @RequestBody String result) {
        try {
            Diagnostics diagnostics = diagnosticsService.addTestResults(id, result);
            if (diagnostics != null) {
                return ResponseEntity.ok(diagnostics);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding results: " + e.getMessage());
        }
    }

    // Update payment status
    @PutMapping("/{id}/payment")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable String id, @RequestParam Boolean paid) {
        try {
            Diagnostics diagnostics = diagnosticsService.updatePaymentStatus(id, paid);
            if (diagnostics != null) {
                return ResponseEntity.ok(diagnostics);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating payment: " + e.getMessage());
        }
    }

    // Add notes to diagnostic
    @PutMapping("/{id}/notes")
    public ResponseEntity<?> addNotes(@PathVariable String id, @RequestBody String notes) {
        try {
            Diagnostics diagnostics = diagnosticsService.addNotes(id, notes);
            if (diagnostics != null) {
                return ResponseEntity.ok(diagnostics);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding notes: " + e.getMessage());
        }
    }

    // Cancel diagnostic
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelDiagnostics(@PathVariable String id) {
        try {
            Diagnostics diagnostics = diagnosticsService.cancelDiagnostics(id);
            if (diagnostics != null) {
                return ResponseEntity.ok(diagnostics);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error cancelling diagnostic: " + e.getMessage());
        }
    }

    // Get completed diagnostics history for user
    @GetMapping("/user/{userId}/history")
    public ResponseEntity<?> getCompletedDiagnostics(@PathVariable String userId) {
        try {
            List<Diagnostics> diagnostics = diagnosticsService.getCompletedDiagnostics(userId);
            return ResponseEntity.ok(diagnostics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching history: " + e.getMessage());
        }
    }

    // Delete diagnostic
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDiagnostics(@PathVariable String id) {
        try {
            boolean deleted = diagnosticsService.deleteDiagnostics(id);
            if (deleted) {
                return ResponseEntity.ok("Diagnostic deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting diagnostic: " + e.getMessage());
        }
    }

    // Get count of diagnostics for user
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<?> getUserDiagnosticsCount(@PathVariable String userId) {
        try {
            long count = diagnosticsService.getUserDiagnosticsCount(userId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error counting diagnostics: " + e.getMessage());
        }
    }

    // Get count by status
    @GetMapping("/status/{status}/count")
    public ResponseEntity<?> getCountByStatus(@PathVariable DiagnosticsStatus status) {
        try {
            long count = diagnosticsService.getDiagnosticsCountByStatus(status);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error counting diagnostics: " + e.getMessage());
        }
    }
}
