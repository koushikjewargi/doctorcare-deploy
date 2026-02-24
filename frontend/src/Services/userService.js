// src/Services/userService.js

// Helper to clean email
const normalize = (email) => email ? email.trim().toLowerCase() : "";

// 1. REGISTER USER
export const registerUser = (userData) => {
  const email = normalize(userData.email);
  // Check if already exists
  if (localStorage.getItem(email)) {
    return { success: false, message: "User already exists!" };
  }
  
  // Save user with standardized email key
  const finalData = {
    ...userData,
    email: email, // Force lowercase
    securityAnswer: userData.securityAnswer.trim().toLowerCase() // Normalize answer
  };
  
  localStorage.setItem(email, JSON.stringify(finalData));
  return { success: true };
};

// 2. LOGIN USER
export const loginUser = (email, password) => {
  const cleanEmail = normalize(email);
  const userStr = localStorage.getItem(cleanEmail);
  
  if (!userStr) return { success: false, message: "User not found." };
  
  const user = JSON.parse(userStr);
  if (user.password === password) {
    return { success: true, user };
  } else {
    return { success: false, message: "Invalid password." };
  }
};

// 3. GET USER (For Forgot Password)
export const getUser = (email) => {
  const cleanEmail = normalize(email);
  const userStr = localStorage.getItem(cleanEmail);
  return userStr ? JSON.parse(userStr) : null;
};

// 4. VERIFY SECURITY ANSWER
export const verifyAnswer = (email, answer) => {
  const user = getUser(email);
  if (!user) return false;
  return user.securityAnswer === answer.trim().toLowerCase();
};

// 5. UPDATE PASSWORD
export const updatePassword = (email, newPassword) => {
  const user = getUser(email);
  if (!user) return false;
  
  user.password = newPassword;
  localStorage.setItem(normalize(email), JSON.stringify(user));
  return true;
};

// 6. DEBUG: CLEAR ALL USERS (Run this if stuck)
export const clearAllUsers = () => {
  localStorage.clear();
};