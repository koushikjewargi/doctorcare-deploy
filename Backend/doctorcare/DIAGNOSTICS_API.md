# Diagnostics API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
All endpoints require authentication via JWT token in the Authorization header.

---

## Diagnostics Endpoints

### 1. Book a Diagnostic Test
- **Method:** `POST`
- **Endpoint:** `/diagnostics/book`
- **Parameters:**
  - `userId` (Long) - User ID
  - `testName` (String) - Name of the test
  - `description` (String, optional) - Test description
  - `cost` (Double) - Cost of the test
  - `bookingDate` (LocalDate, format: YYYY-MM-DD) - Booking date
- **Response:** `201 Created` - Diagnostics object

**Example:**
```
POST http://localhost:8080/api/diagnostics/book?userId=1&testName=Blood%20Test&cost=500&bookingDate=2026-03-20
```

### 2. Get All Diagnostics for a User
- **Method:** `GET`
- **Endpoint:** `/diagnostics/user/{userId}`
- **Parameters:**
  - `userId` (Long) - User ID
- **Response:** `200 OK` - List of Diagnostics

**Example:**
```
GET http://localhost:8080/api/diagnostics/user/1
```

### 3. Get Diagnostic by ID
- **Method:** `GET`
- **Endpoint:** `/diagnostics/{id}`
- **Parameters:**
  - `id` (Long) - Diagnostic ID
- **Response:** `200 OK` - Diagnostics object

**Example:**
```
GET http://localhost:8080/api/diagnostics/5
```

### 4. Get Diagnostic by ID and User ID
- **Method:** `GET`
- **Endpoint:** `/diagnostics/{id}/user/{userId}`
- **Response:** `200 OK` - Diagnostics object

### 5. Get Diagnostics by Status
- **Method:** `GET`
- **Endpoint:** `/diagnostics/status/{status}`
- **Parameters:**
  - `status` (DiagnosticsStatus) - PENDING, BOOKED, IN_PROGRESS, COMPLETED, CANCELLED
- **Response:** `200 OK` - List of Diagnostics

**Example:**
```
GET http://localhost:8080/api/diagnostics/status/COMPLETED
```

### 6. Get User Diagnostics by Status
- **Method:** `GET`
- **Endpoint:** `/diagnostics/user/{userId}/status/{status}`
- **Response:** `200 OK` - List of Diagnostics

### 7. Get Diagnostics by Date
- **Method:** `GET`
- **Endpoint:** `/diagnostics/date/{date}`
- **Parameters:**
  - `date` (LocalDate, format: YYYY-MM-DD)
- **Response:** `200 OK` - List of Diagnostics

### 8. Get Pending Payment Diagnostics
- **Method:** `GET`
- **Endpoint:** `/diagnostics/user/{userId}/pending-payment`
- **Response:** `200 OK` - List of Diagnostics

### 9. Update Diagnostic Status
- **Method:** `PUT`
- **Endpoint:** `/diagnostics/{id}/status/{status}`
- **Response:** `200 OK` - Updated Diagnostics object

**Example:**
```
PUT http://localhost:8080/api/diagnostics/5/status/COMPLETED
```

### 10. Add Test Results
- **Method:** `PUT`
- **Endpoint:** `/diagnostics/{id}/result`
- **Body:** Raw string with test results
- **Response:** `200 OK` - Updated Diagnostics object

### 11. Update Payment Status
- **Method:** `PUT`
- **Endpoint:** `/diagnostics/{id}/payment`
- **Parameters:**
  - `paid` (Boolean) - true/false
- **Response:** `200 OK` - Updated Diagnostics object

### 12. Add Notes to Diagnostic
- **Method:** `PUT`
- **Endpoint:** `/diagnostics/{id}/notes`
- **Body:** Raw string with notes
- **Response:** `200 OK` - Updated Diagnostics object

### 13. Cancel Diagnostic
- **Method:** `PUT`
- **Endpoint:** `/diagnostics/{id}/cancel`
- **Response:** `200 OK` - Updated Diagnostics object

### 14. Get Completed Diagnostics History
- **Method:** `GET`
- **Endpoint:** `/diagnostics/user/{userId}/history`
- **Response:** `200 OK` - List of completed Diagnostics

### 15. Delete Diagnostic
- **Method:** `DELETE`
- **Endpoint:** `/diagnostics/{id}`
- **Response:** `200 OK` - Success message

### 16. Get Diagnostics Count for User
- **Method:** `GET`
- **Endpoint:** `/diagnostics/user/{userId}/count`
- **Response:** `200 OK` - Long (count)

---

## Diagnostics Booking Endpoints

### 1. Create a Booking
- **Method:** `POST`
- **Endpoint:** `/diagnostics-booking/create`
- **Parameters:**
  - `diagnosticsId` (Long) - Diagnostic test ID
  - `userId` (Long) - User ID
  - `appointmentDate` (LocalDate, format: YYYY-MM-DD)
  - `appointmentTime` (LocalTime, format: HH:MM:SS)
  - `location` (String, optional)
- **Response:** `201 Created` - DiagnosticsBooking object

**Example:**
```
POST http://localhost:8080/api/diagnostics-booking/create?diagnosticsId=1&userId=1&appointmentDate=2026-03-20&appointmentTime=10:30:00
```

### 2. Get All Bookings for User
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/user/{userId}`
- **Response:** `200 OK` - List of DiagnosticsBooking

### 3. Get Booking by ID
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/{id}`
- **Response:** `200 OK` - DiagnosticsBooking object

### 4. Get Booking by ID and User ID
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/{id}/user/{userId}`
- **Response:** `200 OK` - DiagnosticsBooking object

### 5. Get All Bookings for a Diagnostic
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/diagnostic/{diagnosticsId}`
- **Response:** `200 OK` - List of DiagnosticsBooking

### 6. Get User Bookings by Status
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/user/{userId}/status/{status}`
- **Parameters:**
  - `status` (BookingStatus) - SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, RESCHEDULED
- **Response:** `200 OK` - List of DiagnosticsBooking

### 7. Get Bookings by Date
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/date/{date}`
- **Response:** `200 OK` - List of DiagnosticsBooking

### 8. Update Booking
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-booking/{id}`
- **Parameters:**
  - `appointmentDate` (LocalDate)
  - `appointmentTime` (LocalTime)
  - `location` (String, optional)
- **Response:** `200 OK` - Updated DiagnosticsBooking object

### 9. Update Booking Status
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-booking/{id}/status/{status}`
- **Response:** `200 OK` - Updated DiagnosticsBooking object

### 10. Add Patient Notes
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-booking/{id}/notes`
- **Body:** Raw string with notes
- **Response:** `200 OK` - Updated DiagnosticsBooking object

### 11. Cancel Booking
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-booking/{id}/cancel`
- **Response:** `200 OK` - Updated DiagnosticsBooking object

### 12. Reschedule Booking
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-booking/{id}/reschedule`
- **Parameters:**
  - `newDate` (LocalDate)
  - `newTime` (LocalTime)
- **Response:** `200 OK` - Updated DiagnosticsBooking object

### 13. Get Upcoming Bookings
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/user/{userId}/upcoming`
- **Response:** `200 OK` - List of upcoming DiagnosticsBooking

### 14. Delete Booking
- **Method:** `DELETE`
- **Endpoint:** `/diagnostics-booking/{id}`
- **Response:** `200 OK` - Success message

### 15. Get Bookings Count for User
- **Method:** `GET`
- **Endpoint:** `/diagnostics-booking/user/{userId}/count`
- **Response:** `200 OK` - Long (count)

---

## Diagnostics Payment Endpoints

### 1. Create Payment
- **Method:** `POST`
- **Endpoint:** `/diagnostics-payment/create`
- **Parameters:**
  - `diagnosticsId` (Long) - Diagnostic test ID
  - `userId` (Long) - User ID
  - `amount` (Double) - Payment amount
  - `paymentMethod` (String) - Credit Card, Debit Card, UPI, etc.
- **Response:** `201 Created` - DiagnosticsPayment object

**Example:**
```
POST http://localhost:8080/api/diagnostics-payment/create?diagnosticsId=1&userId=1&amount=500&paymentMethod=Credit%20Card
```

### 2. Get All Payments for User
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/user/{userId}`
- **Response:** `200 OK` - List of DiagnosticsPayment

### 3. Get Payment by ID
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/{id}`
- **Response:** `200 OK` - DiagnosticsPayment object

### 4. Get Payment by ID and User ID
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/{id}/user/{userId}`
- **Response:** `200 OK` - DiagnosticsPayment object

### 5. Get Payment by Transaction ID
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/transaction/{transactionId}`
- **Response:** `200 OK` - DiagnosticsPayment object

### 6. Get All Payments for a Diagnostic
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/diagnostic/{diagnosticsId}`
- **Response:** `200 OK` - List of DiagnosticsPayment

### 7. Get Payments by Status
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/status/{status}`
- **Parameters:**
  - `status` (PaymentStatus) - PENDING, COMPLETED, FAILED, CANCELLED, REFUNDED
- **Response:** `200 OK` - List of DiagnosticsPayment

### 8. Get User Payments by Status
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/user/{userId}/status/{status}`
- **Response:** `200 OK` - List of DiagnosticsPayment

### 9. Process Payment
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-payment/{id}/process`
- **Parameters:**
  - `status` (PaymentStatus)
- **Response:** `200 OK` - Updated DiagnosticsPayment object

### 10. Complete Payment
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-payment/{id}/complete`
- **Response:** `200 OK` - Updated DiagnosticsPayment object

### 11. Fail Payment
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-payment/{id}/fail`
- **Response:** `200 OK` - Updated DiagnosticsPayment object

### 12. Refund Payment
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-payment/{id}/refund`
- **Response:** `200 OK` - Updated DiagnosticsPayment object

### 13. Cancel Payment
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-payment/{id}/cancel`
- **Response:** `200 OK` - Updated DiagnosticsPayment object

### 14. Update Payment Description
- **Method:** `PUT`
- **Endpoint:** `/diagnostics-payment/{id}/description`
- **Body:** Raw string with description
- **Response:** `200 OK` - Updated DiagnosticsPayment object

### 15. Get Pending Payments
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/user/{userId}/pending`
- **Response:** `200 OK` - List of pending DiagnosticsPayment

### 16. Get Completed Payments
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/user/{userId}/completed`
- **Response:** `200 OK` - List of completed DiagnosticsPayment

### 17. Delete Payment
- **Method:** `DELETE`
- **Endpoint:** `/diagnostics-payment/{id}`
- **Response:** `200 OK` - Success message

### 18. Get Payments Count for User
- **Method:** `GET`
- **Endpoint:** `/diagnostics-payment/user/{userId}/count`
- **Response:** `200 OK` - Long (count)

---

## Data Models

### Diagnostics
```json
{
  "id": 1,
  "userId": 1,
  "testName": "Blood Test",
  "description": "Complete Blood Count",
  "cost": 500.0,
  "status": "PENDING",
  "bookingDate": "2026-03-20",
  "completionDate": null,
  "createdAt": "2026-03-12T10:00:00",
  "updatedAt": null,
  "result": null,
  "paymentDone": false,
  "notes": null
}
```

### DiagnosticsBooking
```json
{
  "id": 1,
  "diagnosticsId": 1,
  "userId": 1,
  "appointmentDate": "2026-03-20",
  "appointmentTime": "10:30:00",
  "location": "Hospital Lab",
  "bookingStatus": "SCHEDULED",
  "createdAt": "2026-03-12T10:00:00",
  "updatedAt": null,
  "patientNotes": null
}
```

### DiagnosticsPayment
```json
{
  "id": 1,
  "diagnosticsId": 1,
  "userId": 1,
  "amount": 500.0,
  "paymentStatus": "PENDING",
  "transactionId": "TXN_1234567890_abc123",
  "paymentDate": "2026-03-12T10:00:00",
  "paymentMethod": "Credit Card",
  "paymentDescription": "Payment for Blood Test",
  "createdAt": "2026-03-12T10:00:00",
  "updatedAt": null
}
```

---

## Status Enums

### DiagnosticsStatus
- PENDING
- BOOKED
- IN_PROGRESS
- COMPLETED
- CANCELLED

### BookingStatus
- SCHEDULED
- CONFIRMED
- COMPLETED
- CANCELLED
- RESCHEDULED

### PaymentStatus
- PENDING
- COMPLETED
- FAILED
- CANCELLED
- REFUNDED

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Error message"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```
