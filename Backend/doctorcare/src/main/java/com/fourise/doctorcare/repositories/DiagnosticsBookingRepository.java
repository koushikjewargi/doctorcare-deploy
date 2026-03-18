package com.fourise.doctorcare.repositories;

import com.fourise.doctorcare.models.DiagnosticsBooking;
import com.fourise.doctorcare.models.BookingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiagnosticsBookingRepository extends MongoRepository<DiagnosticsBooking, String> {
    
    List<DiagnosticsBooking> findByUserId(String userId);
    
    List<DiagnosticsBooking> findByDiagnosticsId(String diagnosticsId);
    
    List<DiagnosticsBooking> findByUserIdAndBookingStatus(String userId, BookingStatus status);
    
    List<DiagnosticsBooking> findByAppointmentDate(LocalDate appointmentDate);
    
    List<DiagnosticsBooking> findByUserIdOrderByAppointmentDateDesc(String userId);
    
    Optional<DiagnosticsBooking> findByIdAndUserId(String id, String userId);
    
    List<DiagnosticsBooking> findByBookingStatus(BookingStatus status);
    
    long countByUserId(String userId);
    
    long countByDiagnosticsId(String diagnosticsId);
}
