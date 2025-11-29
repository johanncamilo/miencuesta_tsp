package com.miencuesta.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDto {

    @NotBlank(message = "El correo es obligatorio")
    @Email
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
}