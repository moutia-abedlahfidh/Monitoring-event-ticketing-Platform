package com.example.users.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretkey ;

    @Value("${jwt.expiration-ms}")
    private long expirationMs ;

    public String generateToken(String username) {
        return Jwts.builder()
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expirationMs))
		.signWith(getSigningKey())
		.compact();

    } 

    private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(secretkey.getBytes(StandardCharsets.UTF_8));
	}
}
