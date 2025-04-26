import React, { useState, useEffect } from "react";
import cerrarSesion from '../hooks/cerrarSesion.JS';
import { Link, useNavigate } from "react-router-dom";

const NavegadorDocente = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  const CerrarSesion = cerrarSesion(); 
  const navigate = useNavigate();

  // Toggle para mostrar u ocultar el modal del perfil
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  // Toggle para mostrar u ocultar las notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Hacer la llamada a la API cuando el componente se monta
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Realiza una solicitud a tu API para obtener las notificaciones
        const response = await fetch('http://localhost:3000/api/notificaciones');
        const data = await response.json();

        // Verificar los datos que recibimos
        console.log(data);

        // Suponiendo que la API devuelve un array de objetos con notificaciones
        setNotifications(data);
      } catch (error) {
        console.error('Error al obtener las notificaciones', error);
      }
    };

    fetchNotifications();
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div className="d-flex flex-column bg-light vh-100" style={{ width: "250px" }}>
      {/* Header con perfil */}
      <div className="p-3 text-center border-bottom">
        <img
          src="/img/navegacion/Avatar2.png" 
          alt="Perfil"
          className="rounded-circle"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
          onClick={toggleProfileModal}
        />
        <p className="mt-2 mb-0 fw-bold">Docente</p>
      </div>

      {/* Navegación principal */}
      <nav className="nav flex-column text-center">
        <a href="/homeDocenteS" className="nav-link py-3" title="Home Docente">
          <i className="bi bi-house fs-4"></i>
          <span className="d-block">Inicio</span>
        </a>
        <a href="/asignarhoras" className="nav-link py-3" title="Asignar Horas">
          <i className="bi bi-clock fs-4"></i>
          <span className="d-block">Asignar Horas</span>
        </a>
        <a href="/postulacionesDocente" className="nav-link py-3" title="Notificaciones">
          <i className="bi bi-clock fs-4"></i>
          <span className="d-block">Notificaciones</span>
        </a>
        <Link to="/gestionarCampañas" className="nav-link py-3" title="Gestionar Campaña">
          <i className="bi bi-pencil fs-4"></i>
          <span className="d-block">Gestionar Campaña</span>
        </Link>
        <button onClick={CerrarSesion} className="nav-link text-danger py-3" title="Cerrar Sesión">
          <i className="bi bi-door-closed fs-4"></i>
          <span className="d-block">Cerrar sesión</span>
        </button>
      </nav>
  </div>
  );
};
      
export default NavegadorDocente;
