package com.fourise.doctorcare.repositories;

import com.fourise.doctorcare.models.DiagnosticsPayment;
import com.fourise.doctorcare.models.PaymentStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiagnosticsPaymentRepository extends MongoRepository<DiagnosticsPayment, String> {
    
    List<DiagnosticsPayment> findByUserId(String userId);
    
    List<DiagnosticsPayment> findByDiagnosticsId(String diagnosticsId);
    
    List<DiagnosticsPayment> findByPaymentStatus(PaymentStatus status);
    
    List<DiagnosticsPayment> findByUserIdAndPaymentStatus(String userId, PaymentStatus status);
    
    Optional<DiagnosticsPayment> findByTransactionId(String transactionId);
    
    List<DiagnosticsPayment> findByUserIdOrderByPaymentDateDesc(String userId);
    
    Optional<DiagnosticsPayment> findByIdAndUserId(String id, String userId);
    
    long countByUserId(String userId);
    
    long countByPaymentStatus(PaymentStatus status);
}
