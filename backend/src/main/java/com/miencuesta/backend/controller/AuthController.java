package com.miencuesta.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.miencuesta.backend.dto.LoginDto;
import com.miencuesta.backend.dto.RegistroUsuarioDto;
import com.miencuesta.backend.dto.RespuestaLoginDto;
import com.miencuesta.backend.model.Usuario;
import com.miencuesta.backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    // private final AuthenticationManager authenticationManager; // Se usaría para el login real

    /**
     * Endpoint para el registro de un usuario (Autorizado).
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegistroUsuarioDto dto) {
        try {
            Usuario usuario = authService.registrarUsuarioAdicional(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Usuario '" + usuario.getCorreo() + "' registrado con éxito en la empresa ID: " + dto.getEmpresaId());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

/**
     * Endpoint para iniciar sesión.
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto dto) {
        try {
            RespuestaLoginDto respuesta = authService.iniciarSesion(dto);
            
            // Devuelve el token en el cuerpo de la respuesta junto a los datos del usuario
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
