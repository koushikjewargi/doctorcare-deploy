package com.fourise.doctorcare.controllers;

import com.fourise.doctorcare.models.DiagnosticsPayment;
import com.fourise.doctorcare.models.PaymentStatus;
import com.fourise.doctorcare.services.DiagnosticsPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diagnostics-payment")
@CrossOrigin(origins = "*")
public class DiagnosticsPaymentController {

    @Autowired
    private DiagnosticsPaymentService diagnosticsPaymentService;

    // Create a payment record
    @PostMapping("/create")
    public ResponseEntity<?> createPayment(
            @RequestParam Long diagnosticsId,
            @RequestParam Long userId,
            @RequestParam Double amount,
            @RequestParam String paymentMethod) {
        try {
            DiagnosticsPayment payment = diagnosticsPaymentService.createPayment(diagnosticsId, userId, amount, paymentMethod);
            return ResponseEntity.status(HttpStatus.CREATED).body(payment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating payment: " + e.getMessage());
        }
    }

    // Get all payments for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserPayments(@PathVariable Long userId) {
        try {
            List<DiagnosticsPayment> payments = diagnosticsPaymentService.getUserPayments(userId);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payments: " + e.getMessage());
        }
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaymentById(@PathVariable Long id) {
        try {
            Optional<DiagnosticsPayment> payment = diagnosticsPaymentService.getPaymentById(id);
            if (payment.isPresent()) {
                return ResponseEntity.ok(payment.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payment: " + e.getMessage());
        }
    }

    // Get payment by ID and userId
    @GetMapping("/{id}/user/{userId}")
    public ResponseEntity<?> getPaymentByIdAndUserId(@PathVariable Long id, @PathVariable Long userId) {
        try {
            Optional<DiagnosticsPayment> payment = diagnosticsPaymentService.getPaymentByIdAndUserId(id, userId);
            if (payment.isPresent()) {
                return ResponseEntity.ok(payment.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found for this user");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payment: " + e.getMessage());
        }
    }

    // Get payment by transaction ID
    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<?> getPaymentByTransactionId(@PathVariable String transactionId) {
        try {
            Optional<DiagnosticsPayment> payment = diagnosticsPaymentService.getPaymentByTransactionId(transactionId);
            if (payment.isPresent()) {
                return ResponseEntity.ok(payment.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payment: " + e.getMessage());
        }
    }

    // Get all payments for a diagnostic
    @GetMapping("/diagnostic/{diagnosticsId}")
    public ResponseEntity<?> getDiagnosticsPayments(@PathVariable Long diagnosticsId) {
        try {
            List<DiagnosticsPayment> payments = diagnosticsPaymentService.getDiagnosticsPayments(diagnosticsId);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payments: " + e.getMessage());
        }
    }

    // Get payments by status
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getPaymentsByStatus(@PathVariable PaymentStatus status) {
        try {
            List<DiagnosticsPayment> payments = diagnosticsPaymentService.getPaymentsByStatus(status);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payments: " + e.getMessage());
        }
    }

    // Get user payments by status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<?> getUserPaymentsByStatus(@PathVariable Long userId, @PathVariable PaymentStatus status) {
        try {
            List<DiagnosticsPayment> payments = diagnosticsPaymentService.getUserPaymentsByStatus(userId, status);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payments: " + e.getMessage());
        }
    }

    // Process payment (update status)
    @PutMapping("/{id}/process")
    public ResponseEntity<?> processPayment(
            @PathVariable Long id,
            @RequestParam PaymentStatus status) {
        try {
            DiagnosticsPayment payment = diagnosticsPaymentService.processPayment(id, status);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment: " + e.getMessage());
        }
    }

    // Complete payment
    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completePayment(@PathVariable Long id) {
        try {
            DiagnosticsPayment payment = diagnosticsPaymentService.completePayment(id);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error completing payment: " + e.getMessage());
        }
    }

    // Fail payment
    @PutMapping("/{id}/fail")
    public ResponseEntity<?> failPayment(@PathVariable Long id) {
        try {
            DiagnosticsPayment payment = diagnosticsPaymentService.failPayment(id);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error failing payment: " + e.getMessage());
        }
    }

    // Refund payment
    @PutMapping("/{id}/refund")
    public ResponseEntity<?> refundPayment(@PathVariable Long id) {
        try {
            DiagnosticsPayment payment = diagnosticsPaymentService.refundPayment(id);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error refunding payment: " + e.getMessage());
        }
    }

    // Cancel payment
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelPayment(@PathVariable Long id) {
        try {
            DiagnosticsPayment payment = diagnosticsPaymentService.cancelPayment(id);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error cancelling payment: " + e.getMessage());
        }
    }

    // Update payment description
    @PutMapping("/{id}/description")
    public ResponseEntity<?> updatePaymentDescription(@PathVariable Long id, @RequestBody String description) {
        try {
            DiagnosticsPayment payment = diagnosticsPaymentService.updatePaymentDescription(id, description);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating description: " + e.getMessage());
        }
    }

    // Get pending payments for user
    @GetMapping("/user/{userId}/pending")
    public ResponseEntity<?> getUserPendingPayments(@PathVariable Long userId) {
        try {
            List<DiagnosticsPayment> payments = diagnosticsPaymentService.getUserPendingPayments(userId);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payments: " + e.getMessage());
        }
    }

    // Get completed payments for user
    @GetMapping("/user/{userId}/completed")
    public ResponseEntity<?> getUserCompletedPayments(@PathVariable Long userId) {
        try {
            List<DiagnosticsPayment> payments = diagnosticsPaymentService.getUserCompletedPayments(userId);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payments: " + e.getMessage());
        }
    }

    // Delete payment record
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        try {
            boolean deleted = diagnosticsPaymentService.deletePayment(id);
            if (deleted) {
                return ResponseEntity.ok("Payment deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting payment: " + e.getMessage());
        }
    }

    // Get count of payments for user
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<?> getUserPaymentsCount(@PathVariable Long userId) {
        try {
            long count = diagnosticsPaymentService.getUserPaymentsCount(userId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error counting payments: " + e.getMessage());
        }
    }

    // Get count by status
    @GetMapping("/status/{status}/count")
    public ResponseEntity<?> getCountByStatus(@PathVariable PaymentStatus status) {
        try {
            long count = diagnosticsPaymentService.getPaymentsCountByStatus(status);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error counting payments: " + e.getMessage());
        }
    }
}
