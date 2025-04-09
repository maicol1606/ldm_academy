import React, { useState } from "react";
import cerrarSesion from '../hooks/cerrarSesion.JS';
import { Link, useNavigate } from "react-router-dom";

const NavegadorDocente = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const CerrarSesion = cerrarSesion(); 
  const navigate = useNavigate();

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setNotificationMessage("");
  };

  const handleAccept = (studentName) => {
    setNotificationMessage(`Se aceptó la notificación de ${studentName}.`);
  };

  const handleReject = (studentName) => {
    setNotificationMessage(`Se rechazó la notificación de ${studentName}.`);
  };

  const students = [
    {
      id: 1,
      name: "Juan Pérez",
      idNumber: "1029384756",
      course: "10-B",
      horaPostulacion: "08:30 AM",
      estado: "Aceptado"
    },
    {
      id: 2,
      name: "Laura Gómez",
      idNumber: "1092837465",
      course: "11-A",
      horaPostulacion: "09:15 AM",
      estado: "Rechazado"
    }
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
        <a href="/asignarhoras" className="nav-link py-3" title="Asignar Horas">
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

      {showNotifications && (
  <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Notificaciones</h5>
          <button type="button" className="btn-close" onClick={toggleNotifications}></button>
        </div>
        <div className="modal-body">
          <h6>Estudiantes postulados a campañas</h6>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Curso</th>
                <th>Hora de postulación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.idNumber}</td>
                  <td>{student.course}</td>
                  <td>{student.horaPostulacion}</td>
                  <td className={student.estado === "Aceptado" ? "text-success" : "text-danger"}>
                    {student.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
