package com.fourise.doctorcare.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fourise.doctorcare.models.User;
import com.fourise.doctorcare.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Check if email already exists
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // Save the new user to MongoDB
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}