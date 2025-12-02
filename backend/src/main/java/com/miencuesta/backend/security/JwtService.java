package com.miencuesta.backend.security;

import com.miencuesta.backend.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationMs;

    public JwtService(@Value("${jwt.secret:default-secret-please-change}") String secret,
                      @Value("${jwt.expiration-ms:3600000}") long expirationMs) {
        // Se recomienda usar una clave larga y segura en producción
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    public String generateToken(Usuario usuario) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(usuario.getCorreo())
                .claim("usuarioId", usuario.getId())
                .claim("nombre", usuario.getNombre())
                .claim("rol", usuario.getRol() != null ? usuario.getRol().getNombre() : null)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
