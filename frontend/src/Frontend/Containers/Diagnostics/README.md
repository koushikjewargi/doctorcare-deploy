# Diagnostic Pages - Complete Update

## Overview
This folder contains the complete diagnostic appointment booking and management system with fully functional pages that match the provided screenshots.

## Pages Included

### 1. **HomePage.js** - Doctor Discovery & Listing
- **Features:**
  - Display list of doctors with ratings and reviews
  - Search functionality to filter doctors by name/specialty
  - Doctor cards with experience, pricing, and quick booking
  - Features section highlighting key benefits
  - Promotional offers banner
  - Responsive grid layout

- **State Management:**
  - `doctors`: Array of doctor objects
  - `loading`: Loading state for data fetching
  - `searchTerm`: Search input for filtering

### 2. **BookingPage.js** - Appointment Selection
- **Features:**
  - Doctor selection with detailed doctor cards
  - Interactive calendar for date selection
  - Time slot selection (6 available slots)
  - Navigation between months
  - Visual confirmation of selected date/time
  - Responsive design with two-column layout

- **State Management:**
  - `selectedDoctor`: Currently selected doctor
  - `selectedDate`: Appointment date
  - `selectedTime`: Appointment time slot
  - `error`: Error messages

### 3. **PatientDetailsPage.js** - Patient Information
- **Features:**
  - Comprehensive patient form with validation
  - First name, last name, email, phone fields
  - Date of birth picker (Day/Month/Year)
  - Gender selection (Male/Female/Other)
  - Complete address fields (Street, City, State)
  - Optional health concerns textarea
  - Displays appointment summary
  - Real-time error validation

- **Validation Includes:**
  - Required field checks
  - Email format validation
  - Phone number length validation (10 digits)
  - Date of birth requirement

### 4. **PaymentPage.js** - Payment Processing
- **Features:**
  - Three payment methods: Card, UPI, Cash at Center
  - Card payment with validation:
    - Cardholder name
    - Card number (16 digits)
    - Expiry month/year
    - CVV (3 digits)
    - Save card option
  - UPI payment with ID validation
  - Cash at center option
  - Booking summary sidebar showing:
    - Appointment details
    - Patient information
    - Price breakdown
  - Secure payment indicator
  - Side-by-side layout (payment form + summary)

- **Validation Features:**
  - Card number formatting
  - CVV digit filtering
  - UPI ID format validation
  - Comprehensive error messages

### 5. **HistoryPage.js** - Booking Management
- **Features:**
  - View all past and current bookings
  - Filter by status (All, Confirmed, Pending, Cancelled)
  - Detailed booking cards showing:
    - Doctor/service name
    - Patient name
    - Date and time
    - Booking ID
    - Amount and payment method
    - Booking date
  - Action buttons:
    - Reschedule (for confirmed bookings)
    - Cancel (for active bookings)
    - Book Again (for cancelled bookings)
  - Status color coding:
    - Green for Confirmed
    - Amber for Pending
    - Red for Cancelled
  - Empty state with call-to-action

### 6. **SuccessPage.js** - Booking Confirmation
- **Features:**
  - Success animation with checkmark
  - Detailed booking information display
  - Booking ID, date, time, patient details
  - Amount and payment method confirmation
  - Status indicator
  - Next steps information box
  - Navigation to booking history and home

### 7. **FailurePage.js** - Error Handling
- **Features:**
  - Error icon and message
  - Troubleshooting guide
  - Payment retry option
  - Customer support contact information
  - Helpful error resolution steps
  - Navigation options

### 8. **Routes.js** - Routing Configuration
- Centralized routing for all diagnostic pages
- Routes:
  - `/` - Home page
  - `/booking` - Booking page
  - `/patient-details` - Patient details
  - `/payment` - Payment processing
  - `/history` - Booking history
  - `/success` - Success confirmation
  - `/failure` - Error page

## Data Flow

```
HomePage 
  ↓ (select doctor + click book)
BookingPage 
  ↓ (select date/time + continue)
PatientDetailsPage 
  ↓ (fill details + continue)
PaymentPage 
  ↓ (select payment method + confirm)
SuccessPage ✓
```

## LocalStorage Keys Used

- `appointmentData` - Stores selected appointment details
- `patientDetails` - Stores patient information
- `diagnosticBookings` - Stores all bookings
- `savedCard` - Stores saved card details (optional)
- `rescheduleFrom` - Stores booking for rescheduling

## Form Validation Rules

### Patient Details Form
- **First Name:** Required, non-empty
- **Last Name:** Required, non-empty
- **Email:** Required, valid email format
- **Phone:** Required, exactly 10 digits
- **Date of Birth:** All three fields required
- **Address:** Required, non-empty
- **City:** Required, non-empty
- **State:** Required, non-empty

### Payment Forms

**Card Details:**
- Cardholder Name: Required
- Card Number: Exactly 16 digits
- Expiry Month: Required (01-12)
- Expiry Year: Required
- CVV: Exactly 3 digits

**UPI Details:**
- UPI ID: Required, format: name@bank

## Styling Features

- **Responsive Design:** Mobile, tablet, and desktop optimized
- **Color Scheme:**
  - Primary: #2563eb (Blue)
  - Success: #10b981 (Green)
  - Error: #dc2626 (Red)
  - Warning: #f59e0b (Amber)
- **Typography:** Clear hierarchy with bold headings and descriptive text
- **UI Elements:**
  - Rounded corners (6-12px)
  - Subtle shadows for depth
  - Smooth transitions (0.3s)
  - Visual feedback on hover/click

## Error Handling

All pages include:
- Input validation with clear error messages
- Network error handling with retry options
- User-friendly error displays
- Helpful troubleshooting information
- Support contact options

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-friendly responsive design
- ES6+ JavaScript features

## Usage

Import routes into your main App.js:

```javascript
import DiagnosticsRoutes from './Frontend/Containers/Diagnostics/Routes';

// In your Routes component:
<Routes>
  <Route path="/diagnostics/*" element={<DiagnosticsRoutes />} />
</Routes>
```

## Notes

- All pages are self-contained with proper state management
- Form data persists in localStorage for session
- Navigation is smooth with proper error handling
- Mobile responsive with proper viewport configurations
- Accessibility features included (labels, semantic HTML)
- `/failure` - Booking failure
- `/history` - Booking history
- `/home` - Diagnostics home page

## Features

- Doctor selection with pricing
- Interactive calendar for date selection
- Time slot selection
- Reminder preferences
- Multiple payment methods (Card, UPI, Offline)
- Booking history with cancel/modify options
- Responsive design for mobile and desktop

## Styling

All components use the shared styles from `../Assets/styles.css` which provides comprehensive styling for forms, buttons, calendars, and responsive layouts.