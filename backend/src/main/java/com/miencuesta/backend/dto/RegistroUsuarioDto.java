package com.miencuesta.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegistroUsuarioDto {

    @NotNull(message = "El ID de la empresa es obligatorio")
    private Long empresaId;

    @NotNull(message = "El ID del rol es obligatorio")
    private Long rolId;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El correo es obligatorio")
    @Email
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
}