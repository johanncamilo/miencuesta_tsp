package com.miencuesta.backend.service;

import com.miencuesta.backend.dto.LoginDto;
import com.miencuesta.backend.dto.RegistroUsuarioDto;
import com.miencuesta.backend.dto.RespuestaLoginDto;
import com.miencuesta.backend.model.Usuario;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder; // Se inyecta la configuración de seguridad

    @Transactional
    public Usuario registrarUsuarioAdicional(RegistroUsuarioDto dto) {

        Usuario usuario = new Usuario();
        return usuario;
    }

    public RespuestaLoginDto iniciarSesion(LoginDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'iniciarSesion'");
    }
}