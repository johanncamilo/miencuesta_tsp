package com.miencuesta.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RespuestaLoginDto {
    private String token;
    private Long usuarioId;
    private String nombreUsuario;
    private String correo;
    private String rol;           // El nombre del rol (ej: "Administrador")
    private Long empresaId;
    private String nombreEmpresa;
}