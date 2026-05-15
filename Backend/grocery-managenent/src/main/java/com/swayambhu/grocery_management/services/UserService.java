package com.swayambhu.grocery_management.services;

import org.springframework.http.ResponseEntity;

import com.swayambhu.grocery_management.dtoMapper.ApiResponse;
import com.swayambhu.grocery_management.dtoMapper.AuthResponse;
import com.swayambhu.grocery_management.dtoMapper.UserLogin;
import com.swayambhu.grocery_management.dtoMapper.UserRegistrationDTO;

public interface UserService {

	AuthResponse registerUser(UserRegistrationDTO user);
	ResponseEntity<ApiResponse> loginUser(UserLogin user);
}
