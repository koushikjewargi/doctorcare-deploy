package com.fourise.doctorcare.repositories;

import com.fourise.doctorcare.models.Diagnostics;
import com.fourise.doctorcare.models.DiagnosticsStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiagnosticsRepository extends MongoRepository<Diagnostics, String> {
    
    List<Diagnostics> findByUserId(String userId);
    
    List<Diagnostics> findByUserIdOrderByCreatedAtDesc(String userId);
    
    List<Diagnostics> findByStatus(DiagnosticsStatus status);
    
    List<Diagnostics> findByUserIdAndStatus(String userId, DiagnosticsStatus status);
    
    List<Diagnostics> findByBookingDate(LocalDate bookingDate);
    
    List<Diagnostics> findByUserIdAndPaymentDone(String userId, Boolean paymentDone);
    
    Optional<Diagnostics> findByIdAndUserId(String id, String userId);
    
    long countByUserId(String userId);
    
    long countByStatus(DiagnosticsStatus status);
}
