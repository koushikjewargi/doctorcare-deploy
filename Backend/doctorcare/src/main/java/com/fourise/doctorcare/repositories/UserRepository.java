package com.fourise.doctorcare.repositories;

import com.fourise.doctorcare.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    
    // Finds a user by their email for Login
    Optional<User> findByEmail(String email);
    
    // Checks if an email is already used during Registration
    Boolean existsByEmail(String email);
}