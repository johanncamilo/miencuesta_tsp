package com.miencuesta.backend.service;

import com.miencuesta.backend.dto.LoginDto;
import com.miencuesta.backend.dto.RegistroUsuarioDto;
import com.miencuesta.backend.dto.RespuestaLoginDto;
import com.miencuesta.backend.model.Usuario;
import com.miencuesta.backend.model.Empresa;
import com.miencuesta.backend.model.Rol;
import com.miencuesta.backend.repository.UsuarioRepository;
import com.miencuesta.backend.repository.EmpresaRepository;
import com.miencuesta.backend.repository.RolRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.miencuesta.backend.security.JwtService;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final RolRepository rolRepository;
    private final JwtService jwtService;

    @Transactional
    public Usuario registrarUsuarioAdicional(RegistroUsuarioDto dto) {

        // Verificar que no exista un usuario con el mismo correo
        if (usuarioRepository.existsByCorreo(dto.getCorreo())) {
            throw new IllegalArgumentException("Ya existe un usuario con ese correo: " + dto.getCorreo());
        }

        // Cargar empresa y rol referenciados
        Empresa empresa = empresaRepository.findById(dto.getEmpresaId())
                .orElseThrow(() -> new IllegalArgumentException("Empresa no encontrada con ID: " + dto.getEmpresaId()));

        Rol rol = rolRepository.findById(dto.getRolId())
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado con ID: " + dto.getRolId()));

        // Construir entidad Usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setCorreo(dto.getCorreo());
        usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        usuario.setEmpresa(empresa);
        usuario.setRol(rol);

        // Persistir en la base de datos
        Usuario guardado = usuarioRepository.save(usuario);

        System.out.println("Registrado usuario: " + guardado.getCorreo() + " con ID: " + guardado.getId());

        return guardado;
    }

    public RespuestaLoginDto iniciarSesion(LoginDto dto) {
        // Buscar usuario por correo
        Usuario usuario = usuarioRepository.findByCorreo(dto.getCorreo())
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

        // Verificar contraseña
        if (!passwordEncoder.matches(dto.getPassword(), usuario.getPasswordHash())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        // Generar token JWT
        String token = jwtService.generateToken(usuario);

        // Construir respuesta
        RespuestaLoginDto respuesta = new RespuestaLoginDto();
        respuesta.setToken(token);
        respuesta.setUsuarioId(usuario.getId());
        respuesta.setNombreUsuario(usuario.getNombre());
        respuesta.setCorreo(usuario.getCorreo());
        respuesta.setRol(usuario.getRol().getNombre());

        System.out.println("Usuario '" + usuario.getCorreo() + "' ha iniciado sesión.");

        return respuesta;
    }
}