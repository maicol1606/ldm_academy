import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavegadorDocente.css"; // Archivo CSS opcional para detalles extra

const NavegadorDocente = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

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
        <a href="/home-docente" className="nav-link py-3" title="Home Docente">
          <i className="bi bi-house fs-4"></i>
          <span className="d-block">Inicio</span>
        </a>
        <a href="/asignar-horas" className="nav-link py-3" title="Asignar Horas">
          <i className="bi bi-clock fs-4"></i>
          <span className="d-block">Asignar Horas</span>
        </a>
        <a href="/crear-campaña" className="nav-link py-3" title="Crear Campaña">
          <i className="bi bi-plus-circle fs-4"></i>
          <span className="d-block">Crear Campaña</span>
        </a>
        <a href="/gestionar-campaña" className="nav-link py-3" title="Gestionar Campaña">
          <i className="bi bi-pencil fs-4"></i>
          <span className="d-block">Gestionar Campaña</span>
        </a>
      </nav>

      {/* Modal de edición de perfil */}
      {showProfileModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Perfil</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleProfileModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="profileName" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="profileName"
                      placeholder="Nombre del docente"
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">
                      Foto de Perfil
                    </label>
                    <input type="file" className="form-control" id="profilePicture" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleProfileModal}
                >
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer opcional */}
      <div className="mt-auto text-center p-3 border-top">
        <i className="bi bi-bell fs-4"></i>
      </div>
    </div>
  );
};

export default NavegadorDocente;
