package com.fourise.doctorcare.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fourise.doctorcare.models.User;
import com.fourise.doctorcare.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") 
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

    // --- NEW LOGIN API ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        
        // Pass the email and password from Postman/React to our Service
        User loggedInUser = userService.loginUser(loginData.getEmail(), loginData.getPassword());
        
        if (loggedInUser != null) {
            return ResponseEntity.ok("Success: You are logged in!");
        } else {
            return ResponseEntity.status(401).body("Error: Invalid email or password");
        }
    }
}