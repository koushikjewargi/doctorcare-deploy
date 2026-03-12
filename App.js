import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import DoctorList from './components/DoctorList';
import Booking from './components/Booking';
import Confirmation from './components/Confirmation';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    type: 'self',
    name: 'Prasad Mane',
    age: '',
    gender: '',
    countryCode: '+91',
    phoneNumber: ''
  });
  // Best Doctor Modal State
  const [showBestDoctorModal, setShowBestDoctorModal] = useState(false);
  const [selectedBestDoctor, setSelectedBestDoctor] = useState(null);

  // ---------- All Doctors with Professional Images ----------
  const allDoctors = useMemo(() => [
    // Popular Doctors (IDs 1-4)
    { id: 1, name: "Dr. Fillerup Grab", specialty: "Medicine Specialist", rating: 4.5, price: "₹2500/hr", experience: "10 years", availability: "Mon-Fri", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", category: "Medicine", popular: true },
    { id: 2, name: "Dr. Blessing", specialty: "Dentist Specialist", rating: 4.7, price: "₹2200/hr", experience: "8 years", availability: "Tue-Sat", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", category: "Dentist", popular: true },
    { id: 3, name: "Dr. Shruti Kedia", specialty: "Dental Surgeon", rating: 4.8, price: "₹2700/hr", experience: "7 years", availability: "Mon-Sun", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", category: "Dentist", popular: true },
    { id: 4, name: "Dr. Truluck Nik", specialty: "Physician", rating: 4.6, price: "₹2400/hr", experience: "12 years", availability: "Mon-Fri", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", category: "Medicine", popular: true },
    // Featured Doctors (IDs 5-7)
    { id: 5, name: "Dr. Crick", specialty: "Cardiologist", price: "₹2500 / hour", rating: 4.9, image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop", category: "Cardiologist", featured: true },
    { id: 6, name: "Dr. Strain", specialty: "Neurologist", price: "₹2200 / hour", rating: 4.8, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", category: "Neurologist", featured: true },
    { id: 7, name: "Dr. Lachinet", specialty: "Orthopedic", price: "₹2000 / hour", rating: 4.7, image: "https://images.unsplash.com/photo-1618498082410-b9aa5eb4ec1d?w=400&h=400&fit=crop", category: "Orthopedic", featured: true },
    // Best Doctors (IDs 12-15)
    { id: 12, name: "Dr. Catherine Bell", specialty: "Cardiologist", rating: 4.9, price: "₹3000/hr", experience: "15 years", awards: "5 Awards", image: "https://images.unsplash.com/photo-1582750433449-648ed1d2db60?w=400&h=400&fit=crop", patients: "5000+", category: "Cardiologist", best: true, achievements: ["Top Cardiologist 2023", "5000+ successful surgeries", "Published 30+ research papers", "Awarded 'Excellence in Cardiology'"] },
    { id: 13, name: "Dr. Michael Chen", specialty: "Neurologist", rating: 4.8, price: "₹2800/hr", experience: "12 years", awards: "3 Awards", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop", patients: "4200+", category: "Neurologist", best: true, achievements: ["Pioneer in stroke rehabilitation", "4000+ patients treated", "Recipient of Young Scientist Award"] },
    { id: 14, name: "Dr. Sarah Johnson", specialty: "Pediatric Surgeon", rating: 4.9, price: "₹3200/hr", experience: "14 years", awards: "7 Awards", image: "https://images.unsplash.com/photo-1527610276295-f4c1b38decc5?w=400&h=400&fit=crop", patients: "3800+", category: "Pediatrician", best: true, achievements: ["Specialist in neonatal surgery", "7 time 'Best Pediatric Surgeon'", "3800+ happy children"] },
    { id: 15, name: "Dr. Robert Kim", specialty: "Orthopedic Surgeon", rating: 4.7, price: "₹2900/hr", experience: "11 years", awards: "4 Awards", image: "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=400&h=400&fit=crop", patients: "4500+", category: "Orthopedic", best: true, achievements: ["Knee & hip replacement expert", "4500+ successful implants", "Developed minimally invasive technique"] },
    // Dentist Doctors
    { id: 8, name: "Dr. Shruti Kedia", specialty: "Dental Surgeon", experience: "7 Years experience", rating: 87, clinic: "Upasana Dental Clinic", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", category: "Dentist" },
    { id: 9, name: "Dr. Watramanik", specialty: "Dental Surgeon", experience: "9 Years experience", rating: 74, clinic: "Dental Care Center", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", category: "Dentist" },
    { id: 10, name: "Dr. Crowner", specialty: "Dental Surgeon", experience: "5 Years experience", rating: 59, clinic: "Smile Clinic", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop", category: "Dentist" },
    { id: 11, name: "Dr. Balestra", specialty: "Dental Surgeon", experience: "6 Years experience", rating: 87, clinic: "Perfect Dental", image: "https://images.unsplash.com/photo-1527610276295-f4c1b38decc5?w=400&h=400&fit=crop", category: "Dentist" },
    // Additional doctors for categories
    { id: 16, name: "Dr. Emily Watson", specialty: "Pediatrician", rating: 4.8, price: "₹2600/hr", experience: "9 years", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", category: "Pediatrician" },
    { id: 17, name: "Dr. James Brown", specialty: "Cardiologist", rating: 4.9, price: "₹3100/hr", experience: "16 years", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", category: "Cardiologist" },
    { id: 18, name: "Dr. Olivia Martinez", specialty: "Neurologist", rating: 4.7, price: "₹2700/hr", experience: "10 years", image: "https://images.unsplash.com/photo-1527610276295-f4c1b38decc5?w=400&h=400&fit=crop", category: "Neurologist" },
    { id: 19, name: "Dr. William Lee", specialty: "Orthopedic", rating: 4.6, price: "₹2500/hr", experience: "8 years", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", category: "Orthopedic" },
  ], []);

  // Derived Lists for Home
  const popularDoctors = allDoctors.filter(d => d.popular);
  const featuredDoctors = allDoctors.filter(d => d.featured);
  const bestDoctors = allDoctors.filter(d => d.best);

  // Categories
  const categories = [
    { name: "Dentist", icon: "🦷", doctors: allDoctors.filter(d => d.category === "Dentist").length },
    { name: "Cardiologist", icon: "❤️", doctors: allDoctors.filter(d => d.category === "Cardiologist").length },
    { name: "Neurologist", icon: "🧠", doctors: allDoctors.filter(d => d.category === "Neurologist").length },
    { name: "Pediatrician", icon: "👶", doctors: allDoctors.filter(d => d.category === "Pediatrician").length },
    { name: "Orthopedic", icon: "🦴", doctors: allDoctors.filter(d => d.category === "Orthopedic").length }
  ];

  // Time Slots
  const timeSlots = {
    "Today": ["1:00 PM", "1:30 PM", "2:00 PM", "3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"],
    "Tomorrow": ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM"],
    "Thu, 25 Feb": ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"]
  };

  // ---------- Country Data (Top 50) ----------
  const countries = [
    { code: "+91", name: "India", flag: "🇮🇳", format: "98765 43210" },
    { code: "+1", name: "USA", flag: "🇺🇸", format: "(555) 123-4567" },
    { code: "+44", name: "UK", flag: "🇬🇧", format: "07911 123456" },
    { code: "+61", name: "Australia", flag: "🇦🇺", format: "0412 345 678" },
    { code: "+86", name: "China", flag: "🇨🇳", format: "131 2345 6789" },
    { code: "+49", name: "Germany", flag: "🇩🇪", format: "0151 23456789" },
    { code: "+33", name: "France", flag: "🇫🇷", format: "06 12 34 56 78" },
    { code: "+81", name: "Japan", flag: "🇯🇵", format: "090-1234-5678" },
    { code: "+7", name: "Russia", flag: "🇷🇺", format: "912 345-67-89" },
    { code: "+55", name: "Brazil", flag: "🇧🇷", format: "(11) 91234-5678" },
    { code: "+27", name: "South Africa", flag: "🇿🇦", format: "071 234 5678" },
    { code: "+34", name: "Spain", flag: "🇪🇸", format: "612 34 56 78" },
    { code: "+39", name: "Italy", flag: "🇮🇹", format: "312 345 6789" },
    { code: "+82", name: "South Korea", flag: "🇰🇷", format: "010-1234-5678" },
    { code: "+52", name: "Mexico", flag: "🇲🇽", format: "55 1234 5678" },
    { code: "+31", name: "Netherlands", flag: "🇳🇱", format: "06 12345678" },
    { code: "+46", name: "Sweden", flag: "🇸🇪", format: "070-123 45 67" },
    { code: "+41", name: "Switzerland", flag: "🇨🇭", format: "079 123 45 67" },
    { code: "+32", name: "Belgium", flag: "🇧🇪", format: "0471 23 45 67" },
    { code: "+64", name: "New Zealand", flag: "🇳🇿", format: "021 123 4567" },
    { code: "+60", name: "Malaysia", flag: "🇲🇾", format: "012-345 6789" },
    { code: "+65", name: "Singapore", flag: "🇸🇬", format: "9123 4567" },
    { code: "+66", name: "Thailand", flag: "🇹🇭", format: "081-234-5678" },
    { code: "+63", name: "Philippines", flag: "🇵🇭", format: "0917 123 4567" },
    { code: "+62", name: "Indonesia", flag: "🇮🇩", format: "0812-3456-7890" },
    { code: "+84", name: "Vietnam", flag: "🇻🇳", format: "091 234 5678" },
    { code: "+20", name: "Egypt", flag: "🇪🇬", format: "0100 123 4567" },
    { code: "+971", name: "UAE", flag: "🇦🇪", format: "050 123 4567" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", format: "050 123 4567" },
    { code: "+90", name: "Turkey", flag: "🇹🇷", format: "0532 123 45 67" },
    { code: "+48", name: "Poland", flag: "🇵🇱", format: "512 345 678" },
    { code: "+47", name: "Norway", flag: "🇳🇴", format: "412 34 567" },
    { code: "+45", name: "Denmark", flag: "🇩🇰", format: "20 12 34 56" },
    { code: "+358", name: "Finland", flag: "🇫🇮", format: "040 123 4567" },
    { code: "+353", name: "Ireland", flag: "🇮🇪", format: "087 123 4567" },
    { code: "+43", name: "Austria", flag: "🇦🇹", format: "0664 12345678" },
    { code: "+30", name: "Greece", flag: "🇬🇷", format: "691 234 5678" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", format: "912 345 678" },
    { code: "+54", name: "Argentina", flag: "🇦🇷", format: "11 1234-5678" },
    { code: "+56", name: "Chile", flag: "🇨🇱", format: "9 1234 5678" },
    { code: "+57", name: "Colombia", flag: "🇨🇴", format: "300 123 4567" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰", format: "071 234 5678" },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩", format: "01712-345678" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰", format: "0301 2345678" },
    { code: "+98", name: "Iran", flag: "🇮🇷", format: "0912 345 6789" },
    { code: "+964", name: "Iraq", flag: "🇮🇶", format: "0791 234 5678" },
    { code: "+972", name: "Israel", flag: "🇮🇱", format: "050-123-4567" },
    { code: "+260", name: "Zambia", flag: "🇿🇲", format: "0977 123456" },
    { code: "+254", name: "Kenya", flag: "🇰🇪", format: "0712 345678" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬", format: "0803 123 4567" },
  ];

  // ---------- Filtered Doctors (for search / specialty) ----------
  const filteredDoctors = useMemo(() => {
    let docs = allDoctors;
    if (selectedSpecialty) {
      docs = docs.filter(d => d.category === selectedSpecialty);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.specialty.toLowerCase().includes(query) ||
        (d.category && d.category.toLowerCase().includes(query))
      );
    }
    return docs;
  }, [allDoctors, searchQuery, selectedSpecialty]);

  // ---------- Handlers ----------
  // ---------- Handlers ----------
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView('booking');
    setBookingStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setPatientInfo({ 
      ...patientInfo, 
      type: 'self', 
      name: 'Prasad Mane', 
      age: '', 
      gender: '',
      phoneNumber: ''
    });
  };

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingTypeChange = (type) => {
    setPatientInfo(prev => ({ 
      ...prev, 
      type,
      name: type === 'self' ? 'Prasad Mane' : ''
    }));
  };

  const handleCountryChange = (e) => {
    setPatientInfo(prev => ({ ...prev, countryCode: e.target.value }));
  };

  const handleBookAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      patient: patientInfo,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setAppointments([...appointments, newAppointment]);
    setCurrentView('confirmation');
  };

  // ---------- Best Doctor Modal Handlers ----------
  const openBestDoctorModal = (doctor) => {
    setSelectedBestDoctor(doctor);
    setShowBestDoctorModal(true);
  };

  const closeBestDoctorModal = () => {
    setShowBestDoctorModal(false);
    setSelectedBestDoctor(null);
  };

  // ---------- Animation Variants ----------
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const cardVariants = {
    hover: { scale: 1.03, boxShadow: "0 25px 35px -10px rgba(0,100,80,0.2)" }
  };

  // ---------- Navigation Handler ----------
  const handleNavigate = (view) => {
    if (view === 'doctorList') {
      setSelectedSpecialty(null);
      setSearchQuery('');
    }
    setCurrentView(view);
  };

  // ---------- Home Page Handlers ----------
  const handleViewSeeAll = () => {
    setSelectedSpecialty(null);
    setCurrentView('doctorList');
  };

  const handleCategorySelect = (category) => {
    setSelectedSpecialty(category);
    setCurrentView('doctorList');
  };

  // ---------- DoctorList Handlers ----------
  const handleHomeNavigate = () => {
    setCurrentView('home');
  };

  const handleSpecialtyFilter = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  // ---------- Booking Handlers ----------
  const handleDoctorListBack = () => {
    setCurrentView('doctorList');
  };

  const handleDateTimeSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setBookingStep(2);
  };

  // ---------- Confirmation Handler ----------
  const handleDone = () => {
    setCurrentView('home');
  };

  // ---------- Main Render ----------
  return (
    <div className="app-container">
      <Navigation 
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <Home
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories}
              featuredDoctors={featuredDoctors}
              popularDoctors={popularDoctors}
              bestDoctors={bestDoctors}
              onCategorySelect={handleCategorySelect}
              onDoctorSelect={handleDoctorSelect}
              onViewSeeAll={handleViewSeeAll}
              showBestDoctorModal={showBestDoctorModal}
              selectedBestDoctor={selectedBestDoctor}
              onOpenBestDoctorModal={openBestDoctorModal}
              onCloseBestDoctorModal={closeBestDoctorModal}
              cardVariants={cardVariants}
              pageVariants={pageVariants}
            />
          )}
          {currentView === 'doctorList' && (
            <DoctorList
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories}
              selectedSpecialty={selectedSpecialty}
              onSpecialtyChange={handleSpecialtyFilter}
              filteredDoctors={filteredDoctors}
              onDoctorSelect={handleDoctorSelect}
              onBack={handleHomeNavigate}
              cardVariants={cardVariants}
              pageVariants={pageVariants}
            />
          )}
          {currentView === 'booking' && (
            <Booking
              selectedDoctor={selectedDoctor}
              bookingStep={bookingStep}
              timeSlots={timeSlots}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              patientInfo={patientInfo}
              countries={countries}
              onDateTimeSelect={handleDateTimeSelect}
              onPatientInfoChange={handlePatientInfoChange}
              onBookingTypeChange={handleBookingTypeChange}
              onCountryChange={handleCountryChange}
              onConfirmAppointment={handleBookAppointment}
              onBack={handleDoctorListBack}
              pageVariants={pageVariants}
            />
          )}
          {currentView === 'confirmation' && (
            <Confirmation
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              patientInfo={patientInfo}
              onDone={handleDone}
              pageVariants={pageVariants}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;