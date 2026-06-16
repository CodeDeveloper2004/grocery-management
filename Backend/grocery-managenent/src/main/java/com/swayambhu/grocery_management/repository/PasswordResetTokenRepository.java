package com.swayambhu.grocery_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swayambhu.grocery_management.entity.PasswordResetToken;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken>
    findByEmailAndOtpAndUsedFalse(
            String email,
            String otp
    );
}