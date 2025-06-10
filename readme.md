# LDM Academy - Sistema de Gestión de Servicio Social

## Descripción

LDM Academy es una plataforma web desarrollada para el Colegio Fernando González Ochoa, específicamente para el área de orientación. El sistema está diseñado para facilitar y optimizar la gestión del servicio social estudiantil, permitiendo un seguimiento eficiente de las actividades, campañas y horas de servicio de los estudiantes.

## Características Principales

### Gestión de Usuarios

-   Sistema de roles (Administrador, Usuario, Docente)
-   Perfiles de usuario con información detallada
-   Gestión de cursos y estados de estudiantes
-   Sistema de verificación de usuarios

### Gestión de Campañas

-   Creación y administración de campañas de servicio social
-   Asignación de cupos por campaña
-   Control de fechas y horarios
-   Gestión de imágenes para campañas
-   Seguimiento de estado de campañas

### Sistema de Postulaciones

-   Proceso de postulación a campañas
-   Estados de postulación (aceptada, rechazada, pendiente)
-   Registro de fechas de postulación

### Control de Asistencia

-   Registro detallado de asistencia
-   Control de horas de servicio
-   Registro de novedades
-   Sistema de certificación de horas

### Sistema de Notificaciones

-   Notificaciones en tiempo real
-   Seguimiento de estado de lectura
-   Registro de fechas de notificación

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/maicol1606/ldm_academy.git
cd ldm_academy
```

2. **Asegúrate de tener XAMPP iniciado**, ya que es necesario para ejecutar el servidor Apache y la base de datos MySQL.

3. Configurar la base de datos:
   Importa el archivo SQL ubicado en `/backend/config/ldm_academy.sql` usando phpMyAdmin para crear la estructura y datos necesarios.

4. Instalar las dependencias:

```bash
npm run download
```

5. Iniciar el servidor de desarrollo frontend:

```bash
npm run dev
```

6. Iniciar el servidor backend:

```bash
npm run server
```

7. Las contraseñas para todas las cuentas de usuario por defecto son: 12345678

---

## Estructura de la Base de Datos

### Tablas Principales

#### roles

-   `id_rol`: Identificador único del rol
-   `nombre`: Nombre del rol (Administrador, Usuario, Docente)

#### usuarios

-   `id_usuario`: Identificador único del usuario
-   `nombre`: Nombre del usuario
-   `apellido`: Apellido del usuario
-   `correo`: Correo electrónico único
-   `contrasena`: Contraseña encriptada
-   `telefono`: Número de teléfono
-   `id_rol`: Referencia al rol del usuario
-   `curso`: Curso del estudiante
-   `estado`: Estado del usuario
-   `codigo_verificacion`: Código para verificación
-   `foto`: Ruta de la foto de perfil

#### campañas

-   `id_campaña`: Identificador único de la campaña
-   `nom_campaña`: Nombre de la campaña
-   `descripcion`: Descripción detallada
-   `fecha`: Fecha de la campaña
-   `cupos`: Número de cupos disponibles
-   `id_docente`: Docente a cargo
-   `imagen`: Imagen de la campaña
-   `estado`: Estado de la campaña

#### postulacion

-   `id_postulacion`: Identificador único de la postulación
-   `id_usuario`: Usuario postulado
-   `id_campaña`: Campaña seleccionada
-   `estado`: Estado de la postulación
-   `fecha`: Fecha de postulación

#### asistencia

-   `id_asistencia`: Identificador único de la asistencia
-   `id_campaña`: Campaña relacionada
-   `id_usuario`: Usuario asistente
-   `fecha`: Fecha de asistencia
-   `hora_inicio`: Hora de inicio
-   `hora_fin`: Hora de finalización
-   `horas`: Total de horas
-   `novedades`: Observaciones

#### certificacion

-   `id_certificacion`: Identificador único de la certificación
-   `id_asistencia`: Asistencia certificada
-   `observaciones`: Observaciones de la certificación
-   `id_usuario`: Usuario certificado

#### notificaciones

-   `id`: Identificador único de la notificación
-   `para_usuario`: Usuario destinatario
-   `mensaje`: Contenido de la notificación
-   `leido`: Estado de lectura
-   `fecha`: Fecha de la notificación

### Relaciones

-   Usuarios → Roles (Muchos a Uno)
-   Postulaciones → Usuarios (Muchos a Uno)
-   Postulaciones → Campañas (Muchos a Uno)
-   Asistencias → Usuarios (Muchos a Uno)
-   Asistencias → Campañas (Muchos a Uno)
-   Certificaciones → Asistencias (Muchos a Uno)
-   Notificaciones → Usuarios (Muchos a Uno)
