package com.fourise.doctorcare.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fourise.doctorcare.models.User;
import com.fourise.doctorcare.repositories.UserRepository;
import java.util.Optional; 

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // --- LOGIN METHOD ---
    public User loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        
        // Check if user exists AND if the password matches perfectly
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get(); // Success!
        }
        return null; // Failed: Wrong email or password
    }

    // ==========================================
    // --- NEW: FORGOT PASSWORD LOGIC ---
    // ==========================================
    
    // 1. Fetch the security question
    public String getSecurityQuestion(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get().getSecurityQuestion();
        }
        return null;
    }

    // 2. Verify answer and update password
    public boolean resetPassword(String email, String answer, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        
        // Check if user exists AND if the answer matches exactly (ignoring uppercase/lowercase)
        if (user.isPresent() && user.get().getSecurityAnswer().equalsIgnoreCase(answer.trim())) {
            User existingUser = user.get();
            existingUser.setPassword(newPassword); // Overwrite old password
            userRepository.save(existingUser);     // Save to MongoDB
            return true;
        }
        return false;
    }
}