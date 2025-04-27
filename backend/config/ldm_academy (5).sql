-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-04-2025 a las 06:25:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ldm_academy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `id_asistencia` int(10) NOT NULL,
  `id_campaña` int(10) DEFAULT NULL,
  `id_usuario` int(10) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_Inicio` time(6) DEFAULT NULL,
  `hora_fin` time(6) NOT NULL,
  `horas` int(10) NOT NULL,
  `novedades` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`id_asistencia`, `id_campaña`, `id_usuario`, `fecha`, `hora_Inicio`, `hora_fin`, `horas`, `novedades`) VALUES
(1, 6, 5, '2025-04-15', '12:44:32.000000', '16:44:32.000000', 5, 'ninguna'),
(2, NULL, 5, NULL, '19:30:00.000000', '22:30:00.000000', 3, 'NINGUNA'),
(3, NULL, 13, NULL, '19:33:00.000000', '12:33:00.000000', 6, '0'),
(4, NULL, 5, '2025-04-09', '18:38:00.000000', '19:38:00.000000', 2, ''),
(5, NULL, 5, '2025-04-15', '19:53:00.000000', '20:53:00.000000', 1, ''),
(6, 6, 5, '2025-04-15', '19:33:00.000000', '12:33:00.000000', 5, ''),
(7, 6, 6, '2025-04-14', '21:35:00.000000', '21:35:00.000000', 120, 'no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campañas`
--

CREATE TABLE `campañas` (
  `id_campaña` int(10) NOT NULL,
  `nom_campaña` varchar(20) NOT NULL,
  `descripcion` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `cupos` int(10) NOT NULL,
  `id_docente` int(11) NOT NULL,
  `imagen` text NOT NULL,
  `estado` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `campañas`
--

INSERT INTO `campañas` (`id_campaña`, `nom_campaña`, `descripcion`, `fecha`, `cupos`, `id_docente`, `imagen`, `estado`) VALUES
(6, 'Enfermeria', 'Apoyo al orientador acargo ', '2025-04-10', 0, 15, 'campana_1743595226657.jpg', 1),
(10, 'Orientacion', 'apoyo', '2025-04-22', 2, 1, 'campana_1745041272531.jpg', 1),
(11, 'Coordinacion', 'apoyo', '2025-04-25', 2, 15, 'campana_1745041395722.png', 1),
(12, 'Coomedor', 'apoyo', '2025-04-16', 4, 15, 'campana_1745041437984.jpg', 1),
(13, 'Salon', 'APOYO', '2025-04-23', 4, 15, 'campana_1745041478016.jpg', 1),
(14, 'Biblioteca', 'apoyo', '2025-04-18', 6, 15, 'campana_1745041514808.jpg', 1),
(15, 'comedor', 'apoyo', '2025-05-09', 19, 15, 'campana_1745635062145.png', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `certificacion`
--

CREATE TABLE `certificacion` (
  `id_certificacion` int(10) NOT NULL,
  `id_asistencia` int(10) DEFAULT NULL,
  `observaciones` varchar(20) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `para_usuario` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT 0,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `para_usuario`, `mensaje`, `leido`, `fecha`) VALUES
(9, 'Loren', 'Enfermería', 127, '0000-00-00 00:00:00'),
(10, 'stefanny', 'Orientación', 127, '0000-00-00 00:00:00'),
(11, 'maicol', 'Biblioteca', 127, '0000-00-00 00:00:00'),
(12, 'camila', 'Salón', 127, '0000-00-00 00:00:00'),
(13, 'ramirez', 'Coordinación', 127, '0000-00-00 00:00:00'),
(14, 'estacio', 'Comedor', 127, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulacion`
--

CREATE TABLE `postulacion` (
  `id_postulacion` int(10) NOT NULL,
  `id_usuario` int(10) DEFAULT NULL,
  `id_campaña` int(10) DEFAULT NULL,
  `estado` enum('pendiente','aceptada','rechazada') DEFAULT 'pendiente',
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `postulacion`
--

INSERT INTO `postulacion` (`id_postulacion`, `id_usuario`, `id_campaña`, `estado`, `fecha`) VALUES
(13, 14, 6, NULL, '2025-04-25 23:51:24'),
(31, 16, 15, 'rechazada', '2025-04-26 04:00:54'),
(32, 17, 15, 'aceptada', '2025-04-26 04:05:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(10) NOT NULL,
  `nombre_rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'administrador'),
(2, 'usuario'),
(3, 'Docente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(10) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `apellido` varchar(200) DEFAULT NULL,
  `correo` varchar(300) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `id_rol` int(10) DEFAULT NULL,
  `curso` varchar(10) DEFAULT NULL,
  `estado` int(2) NOT NULL DEFAULT 1,
  `codigo_verificacion` varchar(7) NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `correo`, `contrasena`, `telefono`, `id_rol`, `curso`, `estado`, `codigo_verificacion`, `foto`) VALUES
(1, 'luna', 'Diaz ', 'stefhanny@gmail.com', '$2y$10$JtHUsJ3fwkMg8d8iHaZa1evj/yyDxxsSCh0GCitoHHpNrJS6KLKj6', '3114370736', 2, '1102', 0, '', ''),
(2, 'camila', 'suspes', 'Valor por defecto', '$2y$10$bhj5U.Wix0GeL2webY1SyuZEOGJ0aWpGaNctmECiuxUcW9d1LI5Pi', '3138975212', 2, '1101', 0, '', ''),
(5, 'luna', 'ramirez', 'stefanny.028293@gmail.com', '$2a$10$VYXrsVIRE76Q2/F.AQ58OO0LdN1MUIoW/Sa18CYxF9I8HkRUwADaq', '3114370736', 2, '1102', 1, '2754', ''),
(6, 'blanca', 'triana', 'blancayanethsuspes@gmail.com', '$2a$10$JxUOrmzHCcu3NxnrKI16ue687oCzZ7O.1TLGzI0IPkY.V7Xd3VS8C', '3208794032', 1, '1102', 1, '', ''),
(7, 'sergio', 'ruiz', 'sergio@gmail.com', '$2a$10$WOn.DgskGPOST.ANOBqXuu9.jNcWBXgsLF/gOKONSHoyKNHtlyXRK', '3115412658', 1, '1101', 1, '', ''),
(13, 'DALIA NICOLE', 'Ramirez Diaz', 'dalia9nicole3@gmail.com', '$2a$10$0zWoHpaqf5FHeI8MFSf4yOM2yyKwOCk5mUvPeoMXJPzwBuFEL5EJG', '3114370736', 2, '1102', 1, '7542', ''),
(14, 'maicol', 'Ramirez Estacio', 'maicol@gmail.com', '$2a$10$5PQHT39t7esQyDITQJ/uAeq2q.9xqoV7x8bOo/yVp/oV3vbr7p.HO', '3225478962', 1, '1201', 1, '', ''),
(15, 'dilan', 'lopez', 'dilanfantas@gmail.com', '$2a$10$BQCo7xtWuP2W3yZcqZoiVOi0CHd1LD4hiCHtfsxER6LM2KDlPOUye', '3115412636', 3, '1001', 1, '', ''),
(16, 'samanta', 'romero', 'samanta@gmail.com', '$2a$10$5dtPXIE8FciyynPGvskQW.2.JJKTvKV4P09Db5BnSezTg/NCTf8ym', '3208794032', 2, '1102', 1, '', ''),
(17, 'loren triana', 'triana', 'lorencamilatrianasuspes@gmail.com', '$2a$10$aHq.zbYRQLvTTyQFAUolJelQsOkpMyRhtMNcE6UPa75bSpN/jR9yy', '3201478569', 2, '1101', 1, '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `asistencia_campaña` (`id_campaña`),
  ADD KEY `asistencia_usuario` (`id_usuario`);

--
-- Indices de la tabla `campañas`
--
ALTER TABLE `campañas`
  ADD PRIMARY KEY (`id_campaña`);

--
-- Indices de la tabla `certificacion`
--
ALTER TABLE `certificacion`
  ADD PRIMARY KEY (`id_certificacion`),
  ADD KEY `certificado_asistencia` (`id_asistencia`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`id_postulacion`),
  ADD KEY `campaña_postulacion` (`id_campaña`) USING BTREE,
  ADD KEY `usuarios-postulacion` (`id_usuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `rol_usuario` (`id_rol`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `id_asistencia` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `campañas`
--
ALTER TABLE `campañas`
  MODIFY `id_campaña` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `certificacion`
--
ALTER TABLE `certificacion`
  MODIFY `id_certificacion` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  MODIFY `id_postulacion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `campaña-asistencia` FOREIGN KEY (`id_campaña`) REFERENCES `campañas` (`id_campaña`),
  ADD CONSTRAINT `usuario-asistencia` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `certificacion`
--
ALTER TABLE `certificacion`
  ADD CONSTRAINT `asistencia` FOREIGN KEY (`id_asistencia`) REFERENCES `asistencia` (`id_asistencia`);

--
-- Filtros para la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD CONSTRAINT `campaña` FOREIGN KEY (`id_campaña`) REFERENCES `campañas` (`id_campaña`),
  ADD CONSTRAINT `usuario-postulacion` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
