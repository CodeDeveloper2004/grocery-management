package com.swayambhu.grocery_management.services.impl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.swayambhu.grocery_management.dtoMapper.ApiResponse;
import com.swayambhu.grocery_management.dtoMapper.AuthResponse;
import com.swayambhu.grocery_management.dtoMapper.UserLogin;
import com.swayambhu.grocery_management.dtoMapper.UserProfileResponse;
import com.swayambhu.grocery_management.dtoMapper.UserRegistrationDTO;
import com.swayambhu.grocery_management.entity.PasswordResetToken;
import com.swayambhu.grocery_management.entity.User;
import com.swayambhu.grocery_management.enums.Role;
import com.swayambhu.grocery_management.repository.PasswordResetTokenRepository;
import com.swayambhu.grocery_management.repository.UserRepository;
import com.swayambhu.grocery_management.security.JwtUtil;
import com.swayambhu.grocery_management.services.EmailService;
import com.swayambhu.grocery_management.services.UserService;
import com.swayambhu.grocery_management.dtoMapper.ForgotPasswordRequest;
import com.swayambhu.grocery_management.dtoMapper.ResetPasswordRequest;

import jakarta.validation.Valid;

@Service
public class UserServiceImpl implements UserService {

	private final JwtUtil jwtUtil;

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final PasswordResetTokenRepository tokenRepository;
	private final EmailService emailService;
	
	public UserServiceImpl(UserRepository userRepository, 
			PasswordEncoder passwordEncoder, 
			JwtUtil jwtUtil,
			PasswordResetTokenRepository tokenRepository,
			EmailService emailService
			) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
		this.tokenRepository = tokenRepository;
		this.emailService=emailService;
	}

	// register user
	@Override
	public AuthResponse registerUser(UserRegistrationDTO userDto) {

		// validate
		if (userRepository.existsByEmail(userDto.getEmail())) {
			throw new RuntimeException("User already exists");
		}

		// map
		User user = new User();
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));

		// assign role
		if (userRepository.count() == 0) {
			user.setRole(Role.ADMIN);
		} else {
			user.setRole(Role.STAFF);
		}

		userRepository.save(user);

		// generate token after registration
		String token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getId());

		// return structured response
		return new AuthResponse(token, user.getEmail(), user.getRole().name(), user.getId());
	}

	private void assignRole(User user) {
		if (userRepository.count() == 0) {
			user.setRole(Role.ADMIN);// first user is always admin
			return;
		}
		// allow only safe roles
		if (user.getRole() == Role.STAFF || user.getRole() == Role.MANAGER) {
			user.setRole(user.getRole());
		} else {
			user.setRole(Role.STAFF);// for fallback
		}

	}

	private User mapToEntity(UserRegistrationDTO user) {
		User u = new User();
		u.setName(user.getName());
		u.setEmail(user.getEmail());
		u.setPassword(passwordEncoder.encode(user.getPassword()));

		return u;
	}

	private void validateUser(UserRegistrationDTO user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new RuntimeException("User already exists");
		}

	}

	@Override
	public ResponseEntity loginUser(UserLogin userdto) {

		User user = userRepository.findByEmail(userdto.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (!passwordEncoder.matches(userdto.getPassword(), user.getPassword())) {
			throw new RuntimeException("Invalid credentials");
		}

		String token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getId());

		AuthResponse response = new AuthResponse(token, user.getEmail(), user.getRole().name(), user.getId());

		return ResponseEntity.ok(response);
	}

	//forget password
	@Override
	public ApiResponse forgotPassword(ForgotPasswordRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));

	    String otp = String.valueOf(
	            new java.util.Random().nextInt(900000) + 100000
	    );

	    PasswordResetToken token =
	            new PasswordResetToken();

	    token.setEmail(user.getEmail());
	    token.setOtp(otp);
	    token.setExpiryTime(
	            java.time.LocalDateTime.now().plusMinutes(5)
	    );

	    tokenRepository.save(token);

	    emailService.sendOtpEmail(
	            user.getEmail(),
	            otp
	    );

	    ApiResponse response= new ApiResponse(
	            true,
	            "OTP sent successfully"
	    );
	    
	    return response;
	}
	
	@Override
	public ApiResponse resetPassword(
	        ResetPasswordRequest request) {

	    PasswordResetToken token =
	            tokenRepository
	                    .findByEmailAndOtpAndUsedFalse(
	                            request.getEmail(),
	                            request.getOtp()
	                    )
	                    .orElseThrow(() ->
	                            new RuntimeException("Invalid OTP"));

	    if (token.getExpiryTime()
	            .isBefore(java.time.LocalDateTime.now())) {

	        throw new RuntimeException("OTP expired");
	    }

	    User user = userRepository.findByEmail(
	            request.getEmail()
	    ).orElseThrow(() ->
	            new RuntimeException("User not found"));

	    user.setPassword(
	            passwordEncoder.encode(
	                    request.getNewPassword()
	            )
	    );

	    userRepository.save(user);

	    token.setUsed(true);

	    tokenRepository.save(token);

	    ApiResponse response= new ApiResponse(
	            true,
	            "Password reset successful"
	    );
	    
	    return response;
	}
	
	@Override
	public UserProfileResponse getProfile() {

	    Authentication authentication =
	            SecurityContextHolder
	                    .getContext()
	                    .getAuthentication();

	    String email = authentication.getName();

	    System.out.println(authentication);

	    System.out.println(authentication.getName());

	    System.out.println(authentication.getAuthorities());

	    User user = userRepository
	            .findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));

	    return new UserProfileResponse(
	            user.getId(),
	            user.getName(),
	            user.getEmail(),
	            user.getRole().name()
	    );
	}
	
}
