package com.miencuesta.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    // 1. Define el filtro de seguridad principal
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http
            // 1.0 Configuración de CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 1.1 Deshabilita CSRF (Cross-Site Request Forgery), necesario para APIs REST
            .csrf(AbstractHttpConfigurer::disable)
            
            // 1.2 Configuración de Autorización de Peticiones
            .authorizeHttpRequests(auth -> auth
                // PERMITE el acceso ANÓNIMO a las rutas de autenticación
                .requestMatchers("/api/auth/**").permitAll()
                
                // CUALQUIER otra petición debe estar autenticada
                .anyRequest().authenticated()
            )
            
            // 1.3 Gestión de Sesiones: La API no usará sesiones (es Stateless, ideal para JWT)
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        // Si usas Spring Security 6.x o superior, es recomendable añadir un manejo de excepciones
        // para personalizar la respuesta 401, pero con JWT, esto se maneja con filtros.
        
        return http.build();
    }

    // Configuración de CORS para permitir peticiones desde el frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000", "http://192.168.0.9:3000/"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
