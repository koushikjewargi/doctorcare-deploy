package com.fourise.doctorcare.repositories;

import com.fourise.doctorcare.models.DiagnosticsPayment;
import com.fourise.doctorcare.models.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiagnosticsPaymentRepository extends JpaRepository<DiagnosticsPayment, Long> {
    
    List<DiagnosticsPayment> findByUserId(Long userId);
    
    List<DiagnosticsPayment> findByDiagnosticsId(Long diagnosticsId);
    
    List<DiagnosticsPayment> findByPaymentStatus(PaymentStatus status);
    
    List<DiagnosticsPayment> findByUserIdAndPaymentStatus(Long userId, PaymentStatus status);
    
    Optional<DiagnosticsPayment> findByTransactionId(String transactionId);
    
    List<DiagnosticsPayment> findByUserIdOrderByPaymentDateDesc(Long userId);
    
    Optional<DiagnosticsPayment> findByIdAndUserId(Long id, Long userId);
    
    long countByUserId(Long userId);
    
    long countByPaymentStatus(PaymentStatus status);
}
