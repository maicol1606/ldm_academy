-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-04-2025 a las 05:21:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

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
(7, 6, 5, '2025-04-14', '21:35:00.000000', '21:35:00.000000', 2, 'no');

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
(4, 'Comedor', 'Se solicita apoyo en el area d', '2024-12-08', 2, 3, '', 1),
(6, 'estudiarrrrr', 'Estudiar durisimo', '2025-04-10', 8, 7, 'campana_1743595226657.jpg', 1),
(7, 'profesor', 'ayudar al prfe', '2025-04-29', 2, 7, 'campana_1743602442395.jpg', 1),
(8, 'jiji', 'leer', '2025-04-10', 5, 7, 'campana_1744240829853.png', 1);

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
-- Estructura de tabla para la tabla `postulacion`
--

CREATE TABLE `postulacion` (
  `id_postulacion` int(10) NOT NULL,
  `id_usuario` int(10) DEFAULT NULL,
  `id_campaña` int(10) DEFAULT NULL,
  `aceptacion` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `postulacion`
--

INSERT INTO `postulacion` (`id_postulacion`, `id_usuario`, `id_campaña`, `aceptacion`) VALUES
(3, 7, 6, NULL),
(4, 5, 6, NULL),
(5, 11, 7, NULL),
(6, 13, 4, NULL);

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
(3, 'pedro', 'lopez', 'pedro@gmail.com', '1234567890', '311547893', 3, '', 1, '', ''),
(4, 'loren', 'triana', 'lorencamilatrianasuspes@gmail.com', '$2a$10$iQXTStFAndPrKEZcm0Xm5ODwfC5gJu.0fa0TI4xDOU60qYKveUiEm', '3115412636', 2, '1101', 0, '7188', ''),
(5, 'luna', 'ramirez', 'stefanny.028293@gmail.com', '$2a$10$VYXrsVIRE76Q2/F.AQ58OO0LdN1MUIoW/Sa18CYxF9I8HkRUwADaq', '3114370736', 2, '1102', 1, '2754', ''),
(6, 'blanca', 'triana', 'blancayanethsuspes@gmail.com', '$2a$10$JxUOrmzHCcu3NxnrKI16ue687oCzZ7O.1TLGzI0IPkY.V7Xd3VS8C', '3208794032', 1, '1102', 1, '', ''),
(7, 'sergio', 'ruiz', 'sergio@gmail.com', '$2a$10$WOn.DgskGPOST.ANOBqXuu9.jNcWBXgsLF/gOKONSHoyKNHtlyXRK', '3115412658', 3, '1101', 1, '', ''),
(9, 'kevin', 'parra', 'kevinparra@gmail.com', '$2a$10$mNb1TeblAT/xfjVDbrzTjOAofZ0Bu2paIau.fSi7DQNi7sSG4zBma', '3114370736', 2, '1001', 1, '', ''),
(10, 'yeny milena', 'diaz', 'yeny@gmail.com', '$2a$10$D9JO0xkm4dgR.v1v58eyguTfKKdq2AFqJLcAWV.uQ4vUnOggQ2cTy', '3204107042', 2, '1001', 1, '', ''),
(11, 'pablo', 'Ramirez Diaz', 'pablo93@gmail.com', '$2a$10$VZIoN9bF7eVX8tSPW7Yc7uHMzQjtQDXRaz8WX0js6j1EqsWePLmzS', '3114370736', 2, '1102', 1, '', ''),
(12, 'yeny milena', 'diaz', 'stefa@gmail.com', '$2a$10$2UhDRzvy0Uq2QU0CSTp8gOku8caCJ68fQahDQFG8wCd7XjUn/VUqW', '3204107041', 2, '1002', 1, '', ''),
(13, 'DALIA NICOLE', 'Ramirez Diaz', 'dalia9nicole3@gmail.com', '$2a$10$0zWoHpaqf5FHeI8MFSf4yOM2yyKwOCk5mUvPeoMXJPzwBuFEL5EJG', '3114370736', 2, '1102', 1, '7542', '');

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
  MODIFY `id_campaña` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `certificacion`
--
ALTER TABLE `certificacion`
  MODIFY `id_certificacion` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  MODIFY `id_postulacion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
