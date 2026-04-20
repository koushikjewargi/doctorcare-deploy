package com.fourise.doctorcare.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fourise.doctorcare.models.User;
import com.fourise.doctorcare.services.UserService;

import java.util.HashMap;
import java.util.Map;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService; 

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }
        userService.saveUser(user);
        return ResponseEntity.ok("Success: User profile and security question saved!");
    }

    // --- UPGRADED LOGIN API ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        User loggedInUser = userService.loginUser(loginData.getEmail(), loginData.getPassword());
        
        if (loggedInUser != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login Successful");
            response.put("name", loggedInUser.getName());
            response.put("email", loggedInUser.getEmail());
            response.put("role", loggedInUser.getRole()); 

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid email or password");
        }
    }

    // ==========================================
    // --- NEW: FORGOT PASSWORD APIs ---
    // ==========================================

    // API 1: Get the Security Question
    @GetMapping("/get-security-question/{email}")
    public ResponseEntity<?> getSecurityQuestion(@PathVariable String email) {
        String question = userService.getSecurityQuestion(email);
        if (question != null) {
            // Send back as JSON so React can read it easily
            Map<String, String> response = new HashMap<>();
            response.put("question", question);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Email not found in our system.");
    }

    // API 2: Validate Answer and Reset Password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String answer = request.get("securityAnswer");
        String newPassword = request.get("newPassword");

        boolean isReset = userService.resetPassword(email, answer, newPassword);
        
        if (isReset) {
            return ResponseEntity.ok("Success: Password has been reset! You can now log in.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Incorrect security answer.");
        }
    }
}