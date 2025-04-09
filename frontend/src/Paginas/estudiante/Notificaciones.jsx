import React, { useState, useEffect } from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
import { Form, Table, Badge } from 'react-bootstrap';

export default function Notificaciones() {
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const fechaActual = new Date().toLocaleDateString();

  useEffect(() => {
    // Simulamos que el nombre del estudiante viene del localStorage
    const nombre = localStorage.getItem('nombreEstudiante') || 'Estudiante';
    setEstudianteNombre(nombre);
  }, []);

  const todasNotificaciones = []; // Aquí ya no hay datos simulados

  // Filtramos las notificaciones que pertenecen al estudiante logueado
  const notificacionesEstudiante = todasNotificaciones.filter(
    (n) => n.nombre === estudianteNombre
  );

  const [filtroCampaña, setFiltroCampaña] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState([]);

  useEffect(() => {
    let resultado = notificacionesEstudiante;

    if (filtroEstado) {
      resultado = resultado.filter((n) =>
        n.estado.toLowerCase().includes(filtroEstado.toLowerCase())
      );
    }

    if (filtroCampaña) {
      resultado = resultado.filter((n) => n.campaña === filtroCampaña);
    }

    setNotificacionesFiltradas(resultado);
  }, [filtroCampaña, filtroEstado, estudianteNombre]);

  const campañas = [
    { nombre: 'Comedor', postulados: 0, activos: 0 },
    { nombre: 'Enfermería', postulados: 0, activos: 0 },
    { nombre: 'Biblioteca', postulados: 0, activos: 0 },
    { nombre: 'Coordinación', postulados: 0, activos: 0 },
    { nombre: 'Orientación', postulados: 0, activos: 0 },
    { nombre: 'Salón', postulados: 0, activos: 0 },
  ];

  return (
    <div>
      <NavegacionEstudiante />
      <div className="container mt-4" style={{ marginLeft: '260px' }}>
        <h3 className="text-center mb-1">Bienvenido, {estudianteNombre}</h3>
        <p className="text-center text-muted">{fechaActual}</p>

        <div className="row mt-4">
          {/* Columna izquierda - campañas */}
          <div className="col-md-3">
            <h5>Lista de Campañas</h5>
            {campañas.map((campaña, index) => (
              <div className="border rounded p-2 mb-2 bg-light shadow-sm" key={index}>
                <strong>{campaña.nombre}</strong>
                <div className="text-muted" style={{ fontSize: '14px' }}>
                  Postulados: {campaña.postulados}<br />
                  Activos: {campaña.activos}
                </div>
              </div>
            ))}
          </div>

          {/* Columna principal */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Notificaciones</h4>
            </div>

            <div className="mb-3">
              <Form.Label><strong>Buscar por campaña:</strong></Form.Label>
              <Form.Select
                value={filtroCampaña}
                onChange={(e) => setFiltroCampaña(e.target.value)}
              >
                <option value="">Todas las campañas</option>
                {campañas.map((campaña, index) => (
                  <option key={index} value={campaña.nombre}>{campaña.nombre}</option>
                ))}
              </Form.Select>
            </div>

            {['Hoy', 'Ayer'].map((dia) => {
              const notifsPorDia = notificacionesFiltradas.filter(n => n.fecha === dia);
              return notifsPorDia.length > 0 ? (
                <div key={dia} className="mb-4">
                  <h6 className="text-secondary">{dia}</h6>
                  <Table bordered striped hover responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Campaña</th>
                        <th>N° Identificación</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifsPorDia.map((noti) => (
                        <tr key={noti.id}>
                          <td>{noti.id}</td>
                          <td>{noti.nombre}</td>
                          <td>{noti.campaña}</td>
                          <td>{noti.numIdentificacion}</td>
                          <td>
                            <Badge bg={noti.estado === 'Aceptada' ? 'success' : 'danger'}>
                              {noti.estado}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
