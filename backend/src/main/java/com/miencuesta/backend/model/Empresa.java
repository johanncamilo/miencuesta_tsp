package com.miencuesta.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "empresas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "empresa_id") // Mapeo exacto a tu PK
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 50)
    private String nit;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('activo','inactivo') DEFAULT 'activo'")
    private EstadoGeneral estado;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    // Relación inversa (opcional, pero útil): Una empresa tiene usuarios
    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuarios;

    @PrePersist
    protected void onCreate() {
        this.creadoEn = LocalDateTime.now();
        if (this.estado == null) this.estado = EstadoGeneral.ACTIVO;
    }
}