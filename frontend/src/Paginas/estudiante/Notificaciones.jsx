import React from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';

export default function Notificaciones() {
  const notificaciones = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      campaña: 'Campaña de Ayuda Social',
      numIdentificacion: '1234567890',
      estado: 'Aceptada',
    },
    {
      id: 2,
      nombre: 'Ana Gómez',
      campaña: 'Campaña de Reciclaje',
      numIdentificacion: '9876543210',
      estado: 'Rechazada',
    },
    {
      id: 3,
      nombre: 'Carlos López',
      campaña: 'Campaña de Educación',
      numIdentificacion: '1112233445',
      estado: 'Aceptada',
    },
  ];

  return (
    <div>
      <NavegacionEstudiante />
      <div className="d-flex">
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
                      <span
                        className={`badge ${
                          notificacion.estado === 'Aceptada' ? 'bg-success' : 'bg-danger'
                        }`}
                      >
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
