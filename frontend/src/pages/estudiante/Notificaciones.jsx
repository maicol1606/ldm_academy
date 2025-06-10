import React, { useState, useEffect } from 'react';
import { Form, Table, Badge } from 'react-bootstrap';
import axios from 'axios';

export default function Notificaciones() {
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [idEstudiante, setIdEstudiante] = useState('');
  const [todasNotificaciones, setTodasNotificaciones] = useState([]);
  const [filtroCampaña, setFiltroCampaña] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState([]);

  const fechaActual = new Date().toLocaleDateString();

  // useEffect para cargar datos del estudiante y las notificaciones
  useEffect(() => {
    // Obtener el nombre y el id del estudiante desde el localStorage
    const nombre = localStorage.getItem('nombreEstudiante') || 'Estudiante';
    const id = localStorage.getItem('idUsuario');
    setEstudianteNombre(nombre);
    setIdEstudiante(id);

    // Llamada a la API para obtener notificaciones
    axios
      .get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/notificaciones`)
      .then((res) => {
        setTodasNotificaciones(res.data);
      })
      .catch((err) => {
        console.error('Error al obtener notificaciones:', err.response);
      });
  }, []);

  // useEffect para filtrar las notificaciones por campaña y estado
  useEffect(() => {
    let resultado = todasNotificaciones;

    if (filtroEstado) {
      resultado = resultado.filter((n) =>
        n.estado.toLowerCase().includes(filtroEstado.toLowerCase())
      );
    }

    if (filtroCampaña) {
      resultado = resultado.filter((n) => n.campaña === filtroCampaña);
    }

    setNotificacionesFiltradas(resultado);
  }, [filtroCampaña, filtroEstado, todasNotificaciones]);

  // Datos de las campañas
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
      <div className="container mt-4">
        <h3 className="text-center mb-1">Bienvenido, {estudianteNombre}</h3>
        <p className="text-center text-muted">{fechaActual}</p>

        <div className="row mt-4">
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

            <div className="mb-3">
              <Form.Label><strong>Filtrar por estado:</strong></Form.Label>
              <Form.Select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="En espera">En espera</option>
                <option value="Leído">Leído</option>
                <option value="Completado">Completado</option>
                <option value="Aceptado">Aceptado</option>
                <option value="Rechazado">Rechazado</option>
              </Form.Select>
            </div>

            {notificacionesFiltradas.length === 0 ? (
              <p className="text-center text-muted">No hay notificaciones disponibles.</p>
            ) : (
              <Table bordered striped hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Campaña</th>
                    <th>Fecha Postulación</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {notificacionesFiltradas.map((noti) => (
                    <tr key={noti.id}>
                      <td>{noti.id}</td>
                      <td>{noti.nombre_estudiante}</td>
                      <td>{noti.campaña}</td>
                      <td>{new Date(noti.fecha_postulacion).toLocaleDateString()}</td>
                      <td>
                        <Badge bg={noti.estado === 'Aceptada' ? 'success' : 'warning'}>
                          {noti.estado}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
