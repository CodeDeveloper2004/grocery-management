package com.swayambhu.grocery_management.dtoMapper;

import lombok.Data;

@Data
public class UserProfileResponse {

    private Long id;

    private String name;

    private String email;

    private String role;

    public UserProfileResponse(
            Long id,
            String name,
            String email,
            String role
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

}