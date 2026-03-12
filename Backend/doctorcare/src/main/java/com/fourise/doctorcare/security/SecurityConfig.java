package com.fourise.doctorcare.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Enable CORS so React (Port 3000/5173) can talk to Spring Boot (Port 8080)
            .cors(Customizer.withDefaults()) 
            
            // 2. Disable CSRF for API testing
            .csrf(csrf -> csrf.disable()) 
            
            .authorizeHttpRequests(auth -> auth
                // 3. Allow "OPTIONS" requests (Browsers and Postman send these to check permissions)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
                
                // 4. Keep the front door completely open for Auth
                .requestMatchers("/api/users/register", "/api/users/login").permitAll() 
                
                // 5. Everything else remains locked
                .anyRequest().authenticated() 
            );
        
        return http.build();
    }
}