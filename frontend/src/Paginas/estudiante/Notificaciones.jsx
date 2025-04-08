import React, { useState, useEffect } from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
import { Form, Table, Badge } from 'react-bootstrap';

export default function Notificaciones() {
  const estudianteNombre = 'Carlos Ruiz'; 
  const fechaActual = new Date().toLocaleDateString();

  const todasNotificaciones = [
    {
      id: 1,
      nombre: 'Carlos Ruiz',
      campaña: 'Comedor',
      numIdentificacion: '1234567890',
      estado: 'Aceptada',
      fecha: 'Hoy',
    },
    {
      id: 2,
      nombre: 'Carlos Ruiz',
      campaña: 'Biblioteca',
      numIdentificacion: '1234567890',
      estado: 'Rechazada',
      fecha: 'Ayer',
    },
    {
      id: 3,
      nombre: 'Ana Gómez',
      campaña: 'Enfermería',
      numIdentificacion: '9876543210',
      estado: 'Aceptada',
      fecha: 'Hoy',
    },
  ];

 
  const notificacionesEstudiante = todasNotificaciones.filter(
    (n) => n.nombre === estudianteNombre
  );

  const [filtroCampaña, setFiltroCampaña] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState(notificacionesEstudiante);

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
  }, [filtroCampaña, filtroEstado]);

  const campañas = ['Comedor', 'Enfermería', 'Biblioteca', 'Coordinación', 'Orientación', 'Salón'];

  return (
    <div>
      <NavegacionEstudiante />
      <div className="container mt-4" style={{ marginLeft: '260px' }}>
        <h3 className="text-center mb-1">Bienvenido, {estudianteNombre}</h3>
        <p className="text-center text-muted">{fechaActual}</p>

        <div className="row mt-4">
          <div className="col-md-3">
            <h5>Lista de Campañas</h5>
            {campañas.map((nombre, index) => (
              <div className="border rounded p-2 mb-2 bg-light shadow-sm" key={index}>
                <strong>{nombre}</strong>
                <div className="text-muted" style={{ fontSize: '14px' }}>
                  Postulados: {Math.floor(Math.random() * 10) + 1}<br />
                  Activos: {Math.floor(Math.random() * 5) + 1}
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
                  <option key={index} value={campaña}>{campaña}</option>
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
