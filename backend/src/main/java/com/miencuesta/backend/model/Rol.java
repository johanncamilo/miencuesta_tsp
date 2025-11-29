package com.miencuesta.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rol_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre; // Ej: "Administrador", "Analista"

    @Column(columnDefinition = "TEXT")
    private String descripcion;
}