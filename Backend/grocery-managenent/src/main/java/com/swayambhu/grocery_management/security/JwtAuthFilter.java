package com.swayambhu.grocery_management.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private final CustomUserDetailsService
            userDetailsService;

    public JwtAuthFilter(
            JwtUtil jwtUtil,
            CustomUserDetailsService
                    userDetailsService
    ) {

        this.jwtUtil = jwtUtil;
        this.userDetailsService =
                userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();

        // Skip auth APIs
        if (path.startsWith("/api/auth")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        String authHeader =
                request.getHeader(
                        "Authorization"
                );

        String token = null;

        String email = null;

        if (
            authHeader != null &&
            authHeader.startsWith("Bearer ")
        ) {

            token = authHeader.substring(7);

            try {

                email =
                        jwtUtil.extractEmail(
                                token
                        );

            }catch(ExpiredJwtException e) {

                response.setStatus(401);

                response.setContentType(
                    "application/json"
                );

                response.getWriter().write(
                    """
                    {
                        "success": false,
                        "message": "JWT token has expired"
                    }
                    """
                );

                return;
            }
        }

        if (
            email != null &&
            SecurityContextHolder
                    .getContext()
                    .getAuthentication() == null
        ) {

            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(
                                    email
                            );

            if (
                jwtUtil.validateToken(
                        token,
                        userDetails.getUsername()
                )
            ) {

                UsernamePasswordAuthenticationToken
                        authToken =
                        new UsernamePasswordAuthenticationToken(

                                userDetails,

                                null,

                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(
                                authToken
                        );
            }
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}