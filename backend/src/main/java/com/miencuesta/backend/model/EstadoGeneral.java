package com.miencuesta.backend.model;

public enum EstadoGeneral {
    ACTIVO("activo"),
    INACTIVO("inactivo");

    private final String valorSql;

    EstadoGeneral(String valorSql) {
        this.valorSql = valorSql;
    }

    // Método útil si necesitas convertir de String a Enum manualmente
    public String getValorSql() {
        return valorSql;
    }
}
