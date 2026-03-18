package com.fourise.doctorcare.controllers;

import com.fourise.doctorcare.models.DiagnosticsBooking;
import com.fourise.doctorcare.models.BookingStatus;
import com.fourise.doctorcare.services.DiagnosticsBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diagnostics-booking")
@CrossOrigin(origins = "*")
public class DiagnosticsBookingController {

    @Autowired
    private DiagnosticsBookingService diagnosticsBookingService;

    // Create a booking
    @PostMapping("/create")
    public ResponseEntity<?> createBooking(
            @RequestParam String diagnosticsId,
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate appointmentDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime appointmentTime,
            @RequestParam(required = false) String location) {
        try {
            DiagnosticsBooking booking = diagnosticsBookingService.createBooking(diagnosticsId, userId, appointmentDate, appointmentTime);
            if (location != null && !location.isEmpty()) {
                booking.setLocation(location);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating booking: " + e.getMessage());
        }
    }

    // Get all bookings for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserBookings(@PathVariable String userId) {
        try {
            List<DiagnosticsBooking> bookings = diagnosticsBookingService.getUserBookings(userId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching bookings: " + e.getMessage());
        }
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable String id) {
        try {
            Optional<DiagnosticsBooking> booking = diagnosticsBookingService.getBookingById(id);
            if (booking.isPresent()) {
                return ResponseEntity.ok(booking.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching booking: " + e.getMessage());
        }
    }

    // Get booking by ID and userId
    @GetMapping("/{id}/user/{userId}")
    public ResponseEntity<?> getBookingByIdAndUserId(@PathVariable String id, @PathVariable String userId) {
        try {
            Optional<DiagnosticsBooking> booking = diagnosticsBookingService.getBookingByIdAndUserId(id, userId);
            if (booking.isPresent()) {
                return ResponseEntity.ok(booking.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found for this user");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching booking: " + e.getMessage());
        }
    }

    // Get all bookings for a diagnostic
    @GetMapping("/diagnostic/{diagnosticsId}")
    public ResponseEntity<?> getDiagnosticsBookings(@PathVariable String diagnosticsId) {
        try {
            List<DiagnosticsBooking> bookings = diagnosticsBookingService.getDiagnosticsBookings(diagnosticsId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching bookings: " + e.getMessage());
        }
    }

    // Get user bookings by status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<?> getUserBookingsByStatus(@PathVariable String userId, @PathVariable BookingStatus status) {
        try {
            List<DiagnosticsBooking> bookings = diagnosticsBookingService.getUserBookingsByStatus(userId, status);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching bookings: " + e.getMessage());
        }
    }

    // Get bookings by date
    @GetMapping("/date/{date}")
    public ResponseEntity<?> getBookingsByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<DiagnosticsBooking> bookings = diagnosticsBookingService.getBookingsByDate(date);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching bookings: " + e.getMessage());
        }
    }

    // Update booking
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(
            @PathVariable String id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate appointmentDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime appointmentTime,
            @RequestParam(required = false) String location) {
        try {
            DiagnosticsBooking booking = diagnosticsBookingService.updateBooking(id, appointmentDate, appointmentTime, location);
            if (booking != null) {
                return ResponseEntity.ok(booking);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating booking: " + e.getMessage());
        }
    }

    // Update booking status
    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable String id, @PathVariable BookingStatus status) {
        try {
            DiagnosticsBooking booking = diagnosticsBookingService.updateBookingStatus(id, status);
            if (booking != null) {
                return ResponseEntity.ok(booking);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating status: " + e.getMessage());
        }
    }

    // Add patient notes
    @PutMapping("/{id}/notes")
    public ResponseEntity<?> addPatientNotes(@PathVariable String id, @RequestBody String notes) {
        try {
            DiagnosticsBooking booking = diagnosticsBookingService.addPatientNotes(id, notes);
            if (booking != null) {
                return ResponseEntity.ok(booking);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding notes: " + e.getMessage());
        }
    }

    // Cancel booking
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable String id) {
        try {
            DiagnosticsBooking booking = diagnosticsBookingService.cancelBooking(id);
            if (booking != null) {
                return ResponseEntity.ok(booking);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error cancelling booking: " + e.getMessage());
        }
    }

    // Reschedule booking
    @PutMapping("/{id}/reschedule")
    public ResponseEntity<?> rescheduleBooking(
            @PathVariable String id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate newDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime newTime) {
        try {
            DiagnosticsBooking booking = diagnosticsBookingService.rescheduleBooking(id, newDate, newTime);
            if (booking != null) {
                return ResponseEntity.ok(booking);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error rescheduling booking: " + e.getMessage());
        }
    }

    // Get upcoming bookings for user
    @GetMapping("/user/{userId}/upcoming")
    public ResponseEntity<?> getUpcomingBookings(@PathVariable String userId) {
        try {
            List<DiagnosticsBooking> bookings = diagnosticsBookingService.getUpcomingBookings(userId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching upcoming bookings: " + e.getMessage());
        }
    }

    // Delete booking
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable String id) {
        try {
            boolean deleted = diagnosticsBookingService.deleteBooking(id);
            if (deleted) {
                return ResponseEntity.ok("Booking deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting booking: " + e.getMessage());
        }
    }

    // Get count of bookings for user
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<?> getUserBookingsCount(@PathVariable String userId) {
        try {
            long count = diagnosticsBookingService.getUserBookingsCount(userId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error counting bookings: " + e.getMessage());
        }
    }
}
