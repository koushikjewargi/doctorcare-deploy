package com.fourise.doctorcare.services;

import com.fourise.doctorcare.models.DiagnosticsBooking;
import com.fourise.doctorcare.models.BookingStatus;
import com.fourise.doctorcare.repositories.DiagnosticsBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class DiagnosticsBookingService {

    @Autowired
    private DiagnosticsBookingRepository diagnosticsBookingRepository;

    // Create a booking
    public DiagnosticsBooking createBooking(String diagnosticsId, String userId, LocalDate appointmentDate, LocalTime appointmentTime) {
        DiagnosticsBooking booking = new DiagnosticsBooking(diagnosticsId, userId, appointmentDate, appointmentTime);
        return diagnosticsBookingRepository.save(booking);
    }

    // Get all bookings for a user
    public List<DiagnosticsBooking> getUserBookings(String userId) {
        return diagnosticsBookingRepository.findByUserIdOrderByAppointmentDateDesc(userId);
    }

    // Get booking by ID
    public Optional<DiagnosticsBooking> getBookingById(String id) {
        return diagnosticsBookingRepository.findById(id);
    }

    // Get booking by ID and userId for security
    public Optional<DiagnosticsBooking> getBookingByIdAndUserId(String id, String userId) {
        return diagnosticsBookingRepository.findByIdAndUserId(id, userId);
    }

    // Get all bookings for a specific diagnostic
    public List<DiagnosticsBooking> getDiagnosticsBookings(String diagnosticsId) {
        return diagnosticsBookingRepository.findByDiagnosticsId(diagnosticsId);
    }

    // Get user's bookings with specific status
    public List<DiagnosticsBooking> getUserBookingsByStatus(String userId, BookingStatus status) {
        return diagnosticsBookingRepository.findByUserIdAndBookingStatus(userId, status);
    }

    // Get bookings for a specific date
    public List<DiagnosticsBooking> getBookingsByDate(LocalDate date) {
        return diagnosticsBookingRepository.findByAppointmentDate(date);
    }

    // Update booking
    public DiagnosticsBooking updateBooking(String id, LocalDate appointmentDate, LocalTime appointmentTime, String location) {
        Optional<DiagnosticsBooking> booking = diagnosticsBookingRepository.findById(id);
        if (booking.isPresent()) {
            DiagnosticsBooking diag = booking.get();
            diag.setAppointmentDate(appointmentDate);
            diag.setAppointmentTime(appointmentTime);
            diag.setLocation(location);
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsBookingRepository.save(diag);
        }
        return null;
    }

    // Update booking status
    public DiagnosticsBooking updateBookingStatus(String id, BookingStatus status) {
        Optional<DiagnosticsBooking> booking = diagnosticsBookingRepository.findById(id);
        if (booking.isPresent()) {
            DiagnosticsBooking diag = booking.get();
            diag.setBookingStatus(status);
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsBookingRepository.save(diag);
        }
        return null;
    }

    // Add patient notes to booking
    public DiagnosticsBooking addPatientNotes(String id, String notes) {
        Optional<DiagnosticsBooking> booking = diagnosticsBookingRepository.findById(id);
        if (booking.isPresent()) {
            DiagnosticsBooking diag = booking.get();
            diag.setPatientNotes(notes);
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsBookingRepository.save(diag);
        }
        return null;
    }

    // Cancel booking
    public DiagnosticsBooking cancelBooking(String id) {
        Optional<DiagnosticsBooking> booking = diagnosticsBookingRepository.findById(id);
        if (booking.isPresent()) {
            DiagnosticsBooking diag = booking.get();
            diag.setBookingStatus(BookingStatus.CANCELLED);
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsBookingRepository.save(diag);
        }
        return null;
    }

    // Reschedule booking
    public DiagnosticsBooking rescheduleBooking(String id, LocalDate newDate, LocalTime newTime) {
        Optional<DiagnosticsBooking> booking = diagnosticsBookingRepository.findById(id);
        if (booking.isPresent()) {
            DiagnosticsBooking diag = booking.get();
            diag.setAppointmentDate(newDate);
            diag.setAppointmentTime(newTime);
            diag.setBookingStatus(BookingStatus.RESCHEDULED);
            diag.setUpdatedAt(LocalDateTime.now());
            return diagnosticsBookingRepository.save(diag);
        }
        return null;
    }

    // Get upcoming bookings for user
    public List<DiagnosticsBooking> getUpcomingBookings(String userId) {
        List<DiagnosticsBooking> bookings = diagnosticsBookingRepository.findByUserIdOrderByAppointmentDateDesc(userId);
        LocalDate today = LocalDate.now();
        bookings.removeIf(booking -> booking.getAppointmentDate().isBefore(today));
        return bookings;
    }

    // Delete booking
    public boolean deleteBooking(String id) {
        try {
            diagnosticsBookingRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Count total bookings for user
    public long getUserBookingsCount(String userId) {
        return diagnosticsBookingRepository.countByUserId(userId);
    }

    // Count total bookings for a diagnostic
    public long getDiagnosticsBookingsCount(String diagnosticsId) {
        return diagnosticsBookingRepository.countByDiagnosticsId(diagnosticsId);
    }
}
