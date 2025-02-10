import React, { useState } from "react";
import cerrarSesion from '../hooks/cerrarSesion.JS';
import { Link, useNavigate } from "react-router-dom";

const NavegadorDocente = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const CerrarSesion = cerrarSesion(); 
  const navigate = useNavigate();

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const students = [
    { id: 1, name: "Juan Pérez", image: "/img/students/juan.png" },
    { id: 2, name: "Ana Gómez", image: "/img/students/ana.png" }
  ];

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
        <a href="/asignar-horas" className="nav-link py-3" title="Asignar Horas">
          <i className="bi bi-clock fs-4"></i>
          <span className="d-block">Asignar Horas</span>
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

      {/* Modal de notificaciones */}
      {showNotifications && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notificaciones</h5>
                <button type="button" className="btn-close" onClick={toggleNotifications}></button>
              </div>
              <div className="modal-body">
                <p>No tienes nuevas notificaciones.</p>
                <h6 className="mt-3">Estudiantes postulados a las campañas</h6>
                {students.map((student) => (
                  <div key={student.id} className="d-flex align-items-center mb-3">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px", cursor: "pointer" }}
                      onClick={() => navigate(`/perfil-estudiante/${student.id}`)}
                    />
                    <span
                      className="ms-2"
                      style={{ cursor: "pointer", fontWeight: "bold" }}
                      onClick={() => navigate(`/perfil-estudiante/${student.id}`)}
                    >
                      {student.name}
                    </span>
                    <div className="ms-auto">
                      <button className="btn btn-success btn-sm me-2">Aceptar</button>
                      <button className="btn btn-danger btn-sm">Rechazar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer con icono de notificaciones */}
      <div className="mt-auto text-center p-3 border-top">
        <i className="bi bi-bell fs-4" style={{ cursor: "pointer" }} onClick={toggleNotifications}></i>
      </div>
    </div>
  );
};

export default NavegadorDocente;
