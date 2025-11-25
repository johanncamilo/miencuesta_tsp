-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2025 a las 00:56:53
-- Versión del servidor: 10.4.32-MariaDB-log
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mi_encuesta_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_encuesta`
--

CREATE TABLE `categorias_encuesta` (
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dashboard_datos`
--

CREATE TABLE `dashboard_datos` (
  `dashboard_id` int(11) NOT NULL,
  `encuesta_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `total_respuestas` int(11) NOT NULL DEFAULT 0,
  `promedio_general` decimal(5,2) DEFAULT NULL,
  `distribucion_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`distribucion_json`)),
  `generado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `empresa_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `nit` varchar(50) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestados`
--

CREATE TABLE `encuestados` (
  `encuestado_id` int(11) NOT NULL,
  `empresa_id` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `encuesta_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` enum('activa','inactiva','eliminada') DEFAULT 'activa',
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `url_larga` text DEFAULT NULL,
  `qr_url` text DEFAULT NULL,
  `creada_por` int(11) NOT NULL,
  `creada_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_usuarios`
--

CREATE TABLE `encuesta_usuarios` (
  `id` int(11) NOT NULL,
  `encuesta_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones_pregunta`
--

CREATE TABLE `opciones_pregunta` (
  `opcion_id` int(11) NOT NULL,
  `pregunta_id` int(11) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `valor` varchar(50) DEFAULT NULL,
  `orden` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `pregunta_id` int(11) NOT NULL,
  `encuesta_id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `tipo` enum('texto','seleccion','multiple','numero','escala') NOT NULL,
  `obligatorio` tinyint(1) DEFAULT 0,
  `orden` int(11) DEFAULT NULL,
  `estado` enum('activa','inactiva') DEFAULT 'activa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `respuesta_id` int(11) NOT NULL,
  `encuesta_id` int(11) NOT NULL,
  `pregunta_id` int(11) NOT NULL,
  `encuestado_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `canal` enum('web','whatsapp','otro') DEFAULT 'web',
  `valor` text NOT NULL,
  `valor_numerico` decimal(10,2) DEFAULT NULL,
  `respondida_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_opciones`
--

CREATE TABLE `respuestas_opciones` (
  `id` int(11) NOT NULL,
  `respuesta_id` int(11) NOT NULL,
  `opcion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias_encuesta`
--
ALTER TABLE `categorias_encuesta`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `dashboard_datos`
--
ALTER TABLE `dashboard_datos`
  ADD PRIMARY KEY (`dashboard_id`),
  ADD KEY `fk_dashboard_empresa` (`empresa_id`),
  ADD KEY `idx_dashboard_encuesta` (`encuesta_id`,`fecha_desde`,`fecha_hasta`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`empresa_id`);

--
-- Indices de la tabla `encuestados`
--
ALTER TABLE `encuestados`
  ADD PRIMARY KEY (`encuestado_id`),
  ADD KEY `idx_encuestados_empresa` (`empresa_id`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`encuesta_id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_encuestas_categoria` (`categoria_id`),
  ADD KEY `fk_encuestas_creada_por` (`creada_por`),
  ADD KEY `idx_encuestas_empresa_estado` (`empresa_id`,`estado`);

--
-- Indices de la tabla `encuesta_usuarios`
--
ALTER TABLE `encuesta_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_encuesta_usuarios_usuario` (`usuario_id`),
  ADD KEY `idx_encuesta_usuarios_encuesta` (`encuesta_id`);

--
-- Indices de la tabla `opciones_pregunta`
--
ALTER TABLE `opciones_pregunta`
  ADD PRIMARY KEY (`opcion_id`),
  ADD KEY `idx_opciones_pregunta_pregunta` (`pregunta_id`,`orden`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`pregunta_id`),
  ADD KEY `idx_preguntas_encuesta_orden` (`encuesta_id`,`orden`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`respuesta_id`),
  ADD KEY `fk_respuestas_usuario` (`usuario_id`),
  ADD KEY `idx_respuestas_encuesta` (`encuesta_id`),
  ADD KEY `idx_respuestas_pregunta` (`pregunta_id`),
  ADD KEY `idx_respuestas_encuestado` (`encuestado_id`);

--
-- Indices de la tabla `respuestas_opciones`
--
ALTER TABLE `respuestas_opciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_resop_respuesta` (`respuesta_id`),
  ADD KEY `idx_resop_opcion` (`opcion_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `fk_usuarios_rol` (`rol_id`),
  ADD KEY `idx_usuarios_empresa` (`empresa_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias_encuesta`
--
ALTER TABLE `categorias_encuesta`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dashboard_datos`
--
ALTER TABLE `dashboard_datos`
  MODIFY `dashboard_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `empresa_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `encuestados`
--
ALTER TABLE `encuestados`
  MODIFY `encuestado_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `encuesta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `encuesta_usuarios`
--
ALTER TABLE `encuesta_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `opciones_pregunta`
--
ALTER TABLE `opciones_pregunta`
  MODIFY `opcion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `pregunta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `respuesta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas_opciones`
--
ALTER TABLE `respuestas_opciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `dashboard_datos`
--
ALTER TABLE `dashboard_datos`
  ADD CONSTRAINT `fk_dashboard_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`),
  ADD CONSTRAINT `fk_dashboard_encuesta` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`encuesta_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `encuestados`
--
ALTER TABLE `encuestados`
  ADD CONSTRAINT `fk_encuestados_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`);

--
-- Filtros para la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `fk_encuestas_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_encuesta` (`categoria_id`),
  ADD CONSTRAINT `fk_encuestas_creada_por` FOREIGN KEY (`creada_por`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `fk_encuestas_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`);

--
-- Filtros para la tabla `encuesta_usuarios`
--
ALTER TABLE `encuesta_usuarios`
  ADD CONSTRAINT `fk_encuesta_usuarios_encuesta` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`encuesta_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_encuesta_usuarios_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `opciones_pregunta`
--
ALTER TABLE `opciones_pregunta`
  ADD CONSTRAINT `fk_opciones_pregunta` FOREIGN KEY (`pregunta_id`) REFERENCES `preguntas` (`pregunta_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `fk_preguntas_encuesta` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`encuesta_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `fk_respuestas_encuesta` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`encuesta_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_respuestas_encuestado` FOREIGN KEY (`encuestado_id`) REFERENCES `encuestados` (`encuestado_id`),
  ADD CONSTRAINT `fk_respuestas_pregunta` FOREIGN KEY (`pregunta_id`) REFERENCES `preguntas` (`pregunta_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_respuestas_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `respuestas_opciones`
--
ALTER TABLE `respuestas_opciones`
  ADD CONSTRAINT `fk_resop_opcion` FOREIGN KEY (`opcion_id`) REFERENCES `opciones_pregunta` (`opcion_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_resop_respuesta` FOREIGN KEY (`respuesta_id`) REFERENCES `respuestas` (`respuesta_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`),
  ADD CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
