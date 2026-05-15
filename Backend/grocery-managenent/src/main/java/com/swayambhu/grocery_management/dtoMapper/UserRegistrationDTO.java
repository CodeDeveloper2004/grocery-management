package com.swayambhu.grocery_management.dtoMapper;

import com.swayambhu.grocery_management.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegistrationDTO {

	@NotBlank(message = "name is required")
	private String name;
	
	@Email(message = "Invalid Email")
	@NotBlank(message = "email is required")
	private String email;
	
	@Size(min = 8 ,message = "Password must be at least 8 characters long")
	private String password;
	
	
	private Role role;
}
