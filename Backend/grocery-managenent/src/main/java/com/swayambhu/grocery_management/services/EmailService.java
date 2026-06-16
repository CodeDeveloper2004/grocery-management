package com.swayambhu.grocery_management.services;

public interface EmailService {

    void sendOtpEmail(
            String toEmail,
            String otp
    );
}