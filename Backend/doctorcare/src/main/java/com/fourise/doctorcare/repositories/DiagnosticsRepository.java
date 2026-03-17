package com.fourise.doctorcare.repositories;

import com.fourise.doctorcare.models.Diagnostics;
import com.fourise.doctorcare.models.DiagnosticsStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiagnosticsRepository extends JpaRepository<Diagnostics, Long> {
    
    List<Diagnostics> findByUserId(Long userId);
    
    List<Diagnostics> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Diagnostics> findByStatus(DiagnosticsStatus status);
    
    List<Diagnostics> findByUserIdAndStatus(Long userId, DiagnosticsStatus status);
    
    List<Diagnostics> findByBookingDate(LocalDate bookingDate);
    
    List<Diagnostics> findByUserIdAndPaymentDone(Long userId, Boolean paymentDone);
    
    Optional<Diagnostics> findByIdAndUserId(Long id, Long userId);
    
    long countByUserId(Long userId);
    
    long countByStatus(DiagnosticsStatus status);
}
