package com.swayambhu.grocery_management.restController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swayambhu.grocery_management.dtoMapper.ApiResponse;
import com.swayambhu.grocery_management.dtoMapper.AuthResponse;
import com.swayambhu.grocery_management.dtoMapper.ForgotPasswordRequest;
import com.swayambhu.grocery_management.dtoMapper.ResetPasswordRequest;
import com.swayambhu.grocery_management.dtoMapper.UserLogin;
import com.swayambhu.grocery_management.dtoMapper.UserProfileResponse;
import com.swayambhu.grocery_management.dtoMapper.UserRegistrationDTO;
import com.swayambhu.grocery_management.services.UserService;

import jakarta.validation.Valid;

@RequestMapping("/api/auth")
@RestController
public class UserRestController {
	
	private final UserService userService;
	
	public UserRestController(UserService userService) {
		this.userService=userService;
	}
	
	@PostMapping("/register")
	public AuthResponse userRegistration(
			@Valid @RequestBody UserRegistrationDTO user) {
		
		return userService.registerUser(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> validateUser(@Valid @RequestBody UserLogin login){
		return ResponseEntity.ok(userService.loginUser(login));
	}
	
	@PostMapping("/forgot-password")
	public ResponseEntity<ApiResponse> forgotPassword(
	        @Valid @RequestBody ForgotPasswordRequest request) {

	    return ResponseEntity.ok(
	            userService.forgotPassword(request)
	    );
	}

	@PostMapping("/reset-password")
	public ResponseEntity<ApiResponse> resetPassword(
	        @Valid @RequestBody ResetPasswordRequest request) {

	    return ResponseEntity.ok(
	            userService.resetPassword(request)
	    );
	}
	
}
