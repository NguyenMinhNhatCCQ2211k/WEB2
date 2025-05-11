package com.minhnhat.example05.controller;

import java.util.Collections;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.minhnhat.example05.exceptions.UserNotFoundException;
import com.minhnhat.example05.payloads.LoginCredentials;
import com.minhnhat.example05.payloads.UserDTO;
import com.minhnhat.example05.security.JWTUtil;
import com.minhnhat.example05.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerHandler(@Valid @RequestBody UserDTO userDTO)
            throws UserNotFoundException {
        // String encodedPass = passwordEncoder.encode(userDTO.getPassword());
        // userDTO.setPassword(encodedPass);
        UserDTO registeredUser = userService.registerUser(userDTO);
        String token = jwtUtil.generateToken(registeredUser.getEmail());
        return new ResponseEntity<>(Collections.singletonMap("jwt-token", token), HttpStatus.CREATED);
    }

    @PostMapping("/login")
public ResponseEntity<Map<String, Object>> loginHandler(@Valid @RequestBody LoginCredentials credentials) {
    try {
        UsernamePasswordAuthenticationToken authCredentials =
                new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword());
        authenticationManager.authenticate(authCredentials);
        String token = jwtUtil.generateToken(credentials.getEmail());
        return ResponseEntity.ok(Collections.singletonMap("jwt-token", token));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", "Invalid email or password"));
    }
}

}