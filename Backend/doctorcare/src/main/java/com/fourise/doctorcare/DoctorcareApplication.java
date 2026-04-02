package com.fourise.doctorcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DoctorcareApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoctorcareApplication.class, args);
    }

    // --- 1. GLOBAL CORS CONFIGURATION FOR VERCEL ---
    @org.springframework.context.annotation.Bean
    public org.springframework.web.servlet.config.annotation.WebMvcConfigurer corsConfigurer() {
        return new org.springframework.web.servlet.config.annotation.WebMvcConfigurer() {
            @Override
            public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://doctorcare-deploy.vercel.app")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    // --- 2. THE ULTIMATE MONGODB HARDWIRE ---
    // This forces Java to ignore Railway's glitches and use the Cloud DB!
    @org.springframework.context.annotation.Bean
    public com.mongodb.client.MongoClient mongoClient() {
        return com.mongodb.client.MongoClients.create("mongodb+srv://koushik:Koushik%4012345@cluster0.1uybnt3.mongodb.net/doctor_db");
    }

    @org.springframework.context.annotation.Bean
    public org.springframework.data.mongodb.core.MongoTemplate mongoTemplate() {
        return new org.springframework.data.mongodb.core.MongoTemplate(mongoClient(), "doctor_db");
    }

}