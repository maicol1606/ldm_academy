import React, { useState } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Card, ListGroup } from 'react-bootstrap';

const NotificacionesAdmin = () => {
  const [notifications] = useState([
    {
      id: '1123132132',
      name: 'Zinzu Chan Lee',
      campaign: 'Comedor',
      avatar: './assets/avatar/avatar1.png',
    },
    {
      id: '278454152',
      name: 'Jeta Saru',
      campaign: 'Enfermería',
      avatar: './assets/avatar/avatar3.png',
    },
    {
      id: '345654654',
      name: 'Sonal Gharti',
      campaign: 'Salón',
      avatar: './assets/avatar/avatar4.png',
    },
  ]);

  return (
    <section className="container-fluid">
      <div className="row">
        <NavegacionAdmin />
        <div className="col-md-10 offset-md-2 p-4">
          <h1 className="mb-4 text-primary">Notificaciones</h1>

          {/* Lista de Notificaciones */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">Notificaciones recientes</Card.Header>
            <ListGroup variant="flush">
              {notifications.map((notification) => (
                <ListGroup.Item key={notification.id} className="d-flex align-items-center">
                  <img src={notification.avatar} alt="Avatar" className="rounded-circle me-3" width="50" height="50" />
                  <div>
                    <h5 className="mb-0">{notification.name}</h5>
                    <small className="text-muted">Se ha postulado a {notification.campaign}</small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          {/* Tabla de Notificaciones */}
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Campaña</th>
                <th>Ver Perfil</th>
                <th>Aceptar</th>
                <th>Rechazar</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.id}</td>
                  <td className="d-flex align-items-center">
                    <img src={notification.avatar} alt="Avatar" className="rounded-circle me-2" width="40" height="40" />
                    {notification.name}
                  </td>
                  <td>{notification.campaign}</td>
                  <td>
                    <Button variant="info" size="sm">Ver Perfil</Button>
                  </td>
                  <td>
                    <Button variant="success" size="sm">Aceptar</Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm">Rechazar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default NotificacionesAdmin;
