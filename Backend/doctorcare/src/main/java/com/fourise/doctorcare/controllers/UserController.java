package com.fourise.doctorcare.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fourise.doctorcare.models.User;
import com.fourise.doctorcare.services.UserService;

import java.util.HashMap;
import java.util.Map;

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

    // --- UPGRADED LOGIN API ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        
        // Pass the email and password from Postman/React to our Service
        User loggedInUser = userService.loginUser(loginData.getEmail(), loginData.getPassword());
        
        if (loggedInUser != null) {
            // Build a professional JSON response with the user's true role
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
}