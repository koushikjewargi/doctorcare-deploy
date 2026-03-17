// Diagnostics API Service for Frontend
// This file handles all API calls for diagnostics functionality

const BASE_URL = 'http://localhost:8080/api';

// ============ DIAGNOSTICS ENDPOINTS ============

export const DiagnosticsAPI = {
  // Book a diagnostic test
  bookDiagnostic: async (userId, testName, description, cost, bookingDate) => {
    try {
      const params = new URLSearchParams({
        userId,
        testName,
        cost,
        bookingDate,
        ...(description && { description })
      });
      const response = await fetch(`${BASE_URL}/diagnostics/book?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error booking diagnostic:', error);
      throw error;
    }
  },

  // Get all diagnostics for a user
  getUserDiagnostics: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
      throw error;
    }
  },

  // Get diagnostic by ID
  getDiagnosticById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching diagnostic:', error);
      throw error;
    }
  },

  // Get diagnostics by status
  getDiagnosticsByStatus: async (status) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/status/${status}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
      throw error;
    }
  },

  // Get user diagnostics by status
  getUserDiagnosticsByStatus: async (userId, status) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/user/${userId}/status/${status}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
      throw error;
    }
  },

  // Get pending payment diagnostics
  getPendingPaymentDiagnostics: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/user/${userId}/pending-payment`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
      throw error;
    }
  },

  // Update diagnostic status
  updateDiagnosticsStatus: async (id, status) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/${id}/status/${status}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating diagnostic:', error);
      throw error;
    }
  },

  // Add test results
  addTestResults: async (id, result) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/${id}/result`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(result)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding test results:', error);
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (id, paid) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/${id}/payment?paid=${paid}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },

  // Add notes to diagnostic
  addNotes: async (id, notes) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/${id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(notes)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding notes:', error);
      throw error;
    }
  },

  // Cancel diagnostic
  cancelDiagnostics: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error cancelling diagnostic:', error);
      throw error;
    }
  },

  // Get diagnostic history
  getCompletedDiagnostics: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/user/${userId}/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },

  // Delete diagnostic
  deleteDiagnostics: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting diagnostic:', error);
      throw error;
    }
  }
};

// ============ DIAGNOSTICS BOOKING ENDPOINTS ============

export const DiagnosticsBookingAPI = {
  // Create a booking
  createBooking: async (diagnosticsId, userId, appointmentDate, appointmentTime, location = null) => {
    try {
      const params = new URLSearchParams({
        diagnosticsId,
        userId,
        appointmentDate,
        appointmentTime,
        ...(location && { location })
      });
      const response = await fetch(`${BASE_URL}/diagnostics-booking/create?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get all bookings for a user
  getUserBookings: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Get user bookings by status
  getUserBookingsByStatus: async (userId, status) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/user/${userId}/status/${status}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Update booking
  updateBooking: async (id, appointmentDate, appointmentTime, location = null) => {
    try {
      const params = new URLSearchParams({
        appointmentDate,
        appointmentTime,
        ...(location && { location })
      });
      const response = await fetch(`${BASE_URL}/diagnostics-booking/${id}?${params}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/${id}/status/${status}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Add patient notes
  addPatientNotes: async (id, notes) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/${id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(notes)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding notes:', error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  // Reschedule booking
  rescheduleBooking: async (id, newDate, newTime) => {
    try {
      const params = new URLSearchParams({
        newDate,
        newTime
      });
      const response = await fetch(`${BASE_URL}/diagnostics-booking/${id}/reschedule?${params}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error rescheduling booking:', error);
      throw error;
    }
  },

  // Get upcoming bookings
  getUpcomingBookings: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/user/${userId}/upcoming`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming bookings:', error);
      throw error;
    }
  },

  // Delete booking
  deleteBooking: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-booking/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
};

// ============ DIAGNOSTICS PAYMENT ENDPOINTS ============

export const DiagnosticsPaymentAPI = {
  // Create a payment
  createPayment: async (diagnosticsId, userId, amount, paymentMethod) => {
    try {
      const params = new URLSearchParams({
        diagnosticsId,
        userId,
        amount,
        paymentMethod
      });
      const response = await fetch(`${BASE_URL}/diagnostics-payment/create?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  // Get all payments for a user
  getUserPayments: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  // Get payment by ID
  getPaymentById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  },

  // Get payment by transaction ID
  getPaymentByTransactionId: async (transactionId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/transaction/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  },

  // Get user payments by status
  getUserPaymentsByStatus: async (userId, status) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/user/${userId}/status/${status}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  // Complete payment
  completePayment: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/${id}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error completing payment:', error);
      throw error;
    }
  },

  // Fail payment
  failPayment: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/${id}/fail`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error failing payment:', error);
      throw error;
    }
  },

  // Refund payment
  refundPayment: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/${id}/refund`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error refunding payment:', error);
      throw error;
    }
  },

  // Cancel payment
  cancelPayment: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error cancelling payment:', error);
      throw error;
    }
  },

  // Get pending payments for user
  getUserPendingPayments: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/user/${userId}/pending`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching pending payments:', error);
      throw error;
    }
  },

  // Get completed payments for user
  getUserCompletedPayments: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/user/${userId}/completed`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching completed payments:', error);
      throw error;
    }
  },

  // Delete payment
  deletePayment: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnostics-payment/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  }
};

export default {
  DiagnosticsAPI,
  DiagnosticsBookingAPI,
  DiagnosticsPaymentAPI
};
