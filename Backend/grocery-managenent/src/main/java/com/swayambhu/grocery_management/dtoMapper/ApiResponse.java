package com.swayambhu.grocery_management.dtoMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiResponse {

//	public ApiResponse(String string, String string2) {
//		// TODO Auto-generated constructor stub
//	}

	private String status;
	
	private String message;
}
