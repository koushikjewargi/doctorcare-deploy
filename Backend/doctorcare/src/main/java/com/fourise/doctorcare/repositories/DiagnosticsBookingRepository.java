package com.fourise.doctorcare.repositories;

import com.fourise.doctorcare.models.DiagnosticsBooking;
import com.fourise.doctorcare.models.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiagnosticsBookingRepository extends JpaRepository<DiagnosticsBooking, Long> {
    
    List<DiagnosticsBooking> findByUserId(Long userId);
    
    List<DiagnosticsBooking> findByDiagnosticsId(Long diagnosticsId);
    
    List<DiagnosticsBooking> findByUserIdAndBookingStatus(Long userId, BookingStatus status);
    
    List<DiagnosticsBooking> findByAppointmentDate(LocalDate appointmentDate);
    
    List<DiagnosticsBooking> findByUserIdOrderByAppointmentDateDesc(Long userId);
    
    Optional<DiagnosticsBooking> findByIdAndUserId(Long id, Long userId);
    
    List<DiagnosticsBooking> findByBookingStatus(BookingStatus status);
    
    long countByUserId(Long userId);
    
    long countByDiagnosticsId(Long diagnosticsId);
}
