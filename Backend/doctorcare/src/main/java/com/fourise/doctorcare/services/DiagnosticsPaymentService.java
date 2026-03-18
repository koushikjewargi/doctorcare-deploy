package com.fourise.doctorcare.services;

import com.fourise.doctorcare.models.DiagnosticsPayment;
import com.fourise.doctorcare.models.PaymentStatus;
import com.fourise.doctorcare.repositories.DiagnosticsPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DiagnosticsPaymentService {

    @Autowired
    private DiagnosticsPaymentRepository diagnosticsPaymentRepository;

    // Create a payment record
    public DiagnosticsPayment createPayment(String diagnosticsId, String userId, Double amount, String paymentMethod) {
        DiagnosticsPayment payment = new DiagnosticsPayment(diagnosticsId, userId, amount, paymentMethod);
        payment.setTransactionId(generateTransactionId());
        return diagnosticsPaymentRepository.save(payment);
    }

    // Get all payments for a user
    public List<DiagnosticsPayment> getUserPayments(String userId) {
        return diagnosticsPaymentRepository.findByUserIdOrderByPaymentDateDesc(userId);
    }

    // Get payment by ID
    public Optional<DiagnosticsPayment> getPaymentById(String id) {
        return diagnosticsPaymentRepository.findById(id);
    }

    // Get payment by ID and userId for security
    public Optional<DiagnosticsPayment> getPaymentByIdAndUserId(String id, String userId) {
        return diagnosticsPaymentRepository.findByIdAndUserId(id, userId);
    }

    // Get payment by transaction ID
    public Optional<DiagnosticsPayment> getPaymentByTransactionId(String transactionId) {
        return diagnosticsPaymentRepository.findByTransactionId(transactionId);
    }

    // Get all payments for a specific diagnostic
    public List<DiagnosticsPayment> getDiagnosticsPayments(String diagnosticsId) {
        return diagnosticsPaymentRepository.findByDiagnosticsId(diagnosticsId);
    }

    // Get payments with specific status
    public List<DiagnosticsPayment> getPaymentsByStatus(PaymentStatus status) {
        return diagnosticsPaymentRepository.findByPaymentStatus(status);
    }

    // Get user payments with specific status
    public List<DiagnosticsPayment> getUserPaymentsByStatus(String userId, PaymentStatus status) {
        return diagnosticsPaymentRepository.findByUserIdAndPaymentStatus(userId, status);
    }

    // Process payment
    public DiagnosticsPayment processPayment(String id, PaymentStatus status) {
        Optional<DiagnosticsPayment> payment = diagnosticsPaymentRepository.findById(id);
        if (payment.isPresent()) {
            DiagnosticsPayment pay = payment.get();
            pay.setPaymentStatus(status);
            pay.setPaymentDate(LocalDateTime.now());
            pay.setUpdatedAt(LocalDateTime.now());
            return diagnosticsPaymentRepository.save(pay);
        }
        return null;
    }

    // Complete payment
    public DiagnosticsPayment completePayment(String id) {
        return processPayment(id, PaymentStatus.COMPLETED);
    }

    // Fail payment
    public DiagnosticsPayment failPayment(String id) {
        return processPayment(id, PaymentStatus.FAILED);
    }

    // Refund payment
    public DiagnosticsPayment refundPayment(String id) {
        Optional<DiagnosticsPayment> payment = diagnosticsPaymentRepository.findById(id);
        if (payment.isPresent()) {
            DiagnosticsPayment pay = payment.get();
            pay.setPaymentStatus(PaymentStatus.REFUNDED);
            pay.setUpdatedAt(LocalDateTime.now());
            return diagnosticsPaymentRepository.save(pay);
        }
        return null;
    }

    // Cancel payment
    public DiagnosticsPayment cancelPayment(String id) {
        Optional<DiagnosticsPayment> payment = diagnosticsPaymentRepository.findById(id);
        if (payment.isPresent()) {
            DiagnosticsPayment pay = payment.get();
            pay.setPaymentStatus(PaymentStatus.CANCELLED);
            pay.setUpdatedAt(LocalDateTime.now());
            return diagnosticsPaymentRepository.save(pay);
        }
        return null;
    }

    // Update payment description
    public DiagnosticsPayment updatePaymentDescription(String id, String description) {
        Optional<DiagnosticsPayment> payment = diagnosticsPaymentRepository.findById(id);
        if (payment.isPresent()) {
            DiagnosticsPayment pay = payment.get();
            pay.setPaymentDescription(description);
            pay.setUpdatedAt(LocalDateTime.now());
            return diagnosticsPaymentRepository.save(pay);
        }
        return null;
    }

    // Get pending payments for user
    public List<DiagnosticsPayment> getUserPendingPayments(String userId) {
        return diagnosticsPaymentRepository.findByUserIdAndPaymentStatus(userId, PaymentStatus.PENDING);
    }

    // Get completed payments for user
    public List<DiagnosticsPayment> getUserCompletedPayments(String userId) {
        return diagnosticsPaymentRepository.findByUserIdAndPaymentStatus(userId, PaymentStatus.COMPLETED);
    }

    // Delete payment record
    public boolean deletePayment(String id) {
        try {
            diagnosticsPaymentRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Count total payments for user
    public long getUserPaymentsCount(String userId) {
        return diagnosticsPaymentRepository.countByUserId(userId);
    }

    // Count payments with specific status
    public long getPaymentsCountByStatus(PaymentStatus status) {
        return diagnosticsPaymentRepository.countByPaymentStatus(status);
    }

    // Generate unique transaction ID
    private String generateTransactionId() {
        return "TXN_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 8);
    }
}
