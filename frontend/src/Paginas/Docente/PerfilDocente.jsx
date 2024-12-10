import React, { useState, useEffect } from 'react';
import NavegacionAdmin from '../../Componentes/NavegacionEstudiante';

export default function Notificaciones() {
  // Definir el estado para las notificaciones
  const [notificaciones, setNotificaciones] = useState([]);

  // Simulación de la carga de datos (esto podría venir de una API)
  useEffect(() => {
    const datosNotificaciones = [
      { id: 1, nombre: 'Juan Pérez', campaña: 'Comedor', numIdentificacion: '12345', estado: 'Aceptada' },
      { id: 2, nombre: 'María Gómez', campaña: 'Biblioteca', numIdentificacion: '67890', estado: 'Pendiente' },
      { id: 3, nombre: 'Carlos Rodríguez', campaña: 'Enfermería', numIdentificacion: '11223', estado: 'Rechazada' },
    ];
    setNotificaciones(datosNotificaciones); // Asignar los datos al estado
  }, []);

  return (
    <div>
      <div className="d-flex">
        {/* Menú lateral */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
          <h4 className="mb-4">Menú</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <a href="#perfil" className="nav-link active">Ver Perfil</a>
            </li>
            <li className="nav-item mb-3">
              <a href="#horas" className="nav-link">Ver Horas</a>
            </li>
            <li className="nav-item mb-3">
              <a href="#campañas" className="nav-link">Campañas</a>
            </li>
            <li className="nav-item mb-3">
              <a href="#certificados" className="nav-link">Certificados</a>
            </li>
            <li className="nav-item mb-3">
              <a href="#notificaciones" className="nav-link">Notificaciones</a>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <div className="container" style={{ marginLeft: '260px' }}>
          <section id="notificaciones" className="mt-5">
            <h2 className="text-center mb-4">Notificaciones</h2>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Campañas Postuladas</th>
                  <th>Número de Identificación</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {notificaciones.map((notificacion) => (
                  <tr key={notificacion.id}>
                    <td>{notificacion.id}</td>
                    <td>{notificacion.nombre}</td>
                    <td>{notificacion.campaña}</td>
                    <td>{notificacion.numIdentificacion}</td>
                    <td>
                      <span className={`badge ${notificacion.estado === 'Aceptada' ? 'bg-success' : 'bg-danger'}`}>
                        {notificacion.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}
