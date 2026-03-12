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

    // Registration API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        
        // 1. Check if the email is already in the database
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }

        // 2. If it is a new email, save the user
        userService.saveUser(user);
        return ResponseEntity.ok("Success: User profile and security question saved to MongoDB!");
    }
}