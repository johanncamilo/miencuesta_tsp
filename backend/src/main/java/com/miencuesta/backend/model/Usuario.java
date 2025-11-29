package com.miencuesta.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private Long id;

    @Column(nullable = false)
    private String nombre; // Nombre completo del usuario

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('activo','inactivo') DEFAULT 'activo'")
    private EstadoGeneral estado;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    // --- RELACIONES (Foreign Keys) ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @ManyToOne(fetch = FetchType.EAGER) // Eager para cargar el rol al hacer login
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;

    @PrePersist
    protected void onCreate() {
        this.creadoEn = LocalDateTime.now();
        if (this.estado == null) this.estado = EstadoGeneral.ACTIVO;
    }
}