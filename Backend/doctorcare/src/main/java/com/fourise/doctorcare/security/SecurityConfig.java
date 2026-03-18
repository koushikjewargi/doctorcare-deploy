package com.fourise.doctorcare.security;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
<<<<<<< HEAD
            // 1. Turn on the CORS bouncer (He will look at the Bean below for the rules)
=======
>>>>>>> d1c75fff9ab344d6c6e983a8b80a1ba9f3478311
            .cors(Customizer.withDefaults()) 
            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
<<<<<<< HEAD
                // 3. Allow "OPTIONS" requests (Browsers send these automatically to check CORS rules)
=======
>>>>>>> d1c75fff9ab344d6c6e983a8b80a1ba9f3478311
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
                // Keep the API open while authentication is not fully implemented.
                .requestMatchers("/api/**").permitAll()
                .anyRequest().permitAll()
            );
        
        return http.build();
    }

    // --- NEW: THE VIP GUEST LIST ---
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Put your React frontend ports here (React uses 3000, Vite uses 5173)
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173")); 
        
        // Allow these specific types of requests
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Allow headers like JWT Tokens to pass through
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply these rules to ALL backend URLs
        return source;
    }
}
