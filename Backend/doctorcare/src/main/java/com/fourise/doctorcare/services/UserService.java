package com.fourise.doctorcare.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fourise.doctorcare.models.User;
import com.fourise.doctorcare.repositories.UserRepository;
import java.util.Optional; // Make sure to add this import!

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

    // --- NEW LOGIN METHOD ---
    public User loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        
        // Check if user exists AND if the password matches perfectly
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get(); // Success!
        }
        return null; // Failed: Wrong email or password
    }
}