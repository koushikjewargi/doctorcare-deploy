# Diagnostics Module

This folder contains all the components related to the diagnostics/booking functionality of the Doctor Care Online app.

## Components

- **BookingPage.js**: Main booking page where users select doctors, dates, and times
- **PaymentPage.js**: Payment processing page with multiple payment options
- **PatientDetailsPage.js**: Form for entering patient information
- **SuccessPage.js**: Confirmation page after successful booking
- **FailurePage.js**: Error page for failed bookings
- **HistoryPage.js**: Page to view booking history and manage appointments
- **HomePage.js**: Landing page for the diagnostics section

## Routes

- `/booking` - Doctor selection and appointment booking
- `/payment` - Payment processing
- `/patient` - Patient details form
- `/success` - Booking confirmation
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