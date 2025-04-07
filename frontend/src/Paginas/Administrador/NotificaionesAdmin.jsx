import React, { useState } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Trash, CheckCircle, Bell } from 'react-bootstrap-icons';

const NotificacionesAdmin = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1123132132',
      name: 'Zinzu Chan Lee',
      campaign: 'Comedor',
      avatar: './assets/avatar/avatar1.png',
      date: 'Hoy'
    },
    {
      id: '278454152',
      name: 'Jeta Saru',
      campaign: 'Enfermería',
      avatar: './assets/avatar/avatar3.png',
      date: 'Hoy'
    },
    {
      id: '345654654',
      name: 'Sonal Gharti',
      campaign: 'Salón',
      avatar: './assets/avatar/avatar4.png',
      date: 'Ayer'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState('');

  const handleAccept = (name) => {
    setAlert(`Has aceptado a ${name}`);
    setTimeout(() => setAlert(''), 3000);
  };

  const filteredNotifications = notifications.filter(n =>
    n.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container-fluid bg-light min-vh-100">
      <div className="row">
        <NavegacionAdmin />
        <div className="col-md-10 offset-md-2 p-4">
          <h4 className="fw-bold">Vienvenido, administrador</h4>
          <p className="text-muted">Tienes {notifications.length} notificaciones por revisar</p>

          <div className="d-flex justify-content-between align-items-center my-3">
            <h5 className="fw-bold">Notificaciones</h5>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-50"
            />
            <Button variant="outline-primary" size="sm" className="ms-3">Marcar todo como leído</Button>
          </div>

          {alert && (
            <Alert variant="success" className="mt-2">
              {alert}
            </Alert>
          )}

          {['Hoy', 'Ayer'].map((fecha) => (
            <div key={fecha}>
              <h6 className="text-muted mt-4">{fecha}</h6>
              {filteredNotifications
                .filter(n => n.date === fecha)
                .map((notification) => (
                  <Card key={notification.id} className="mb-3 shadow-sm border-0">
                    <Card.Body className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: 40, height: 40 }}>
                          <Bell />
                        </div>
                        <div>
                          <h6 className="mb-0">{notification.name} se postuló a {notification.campaign}</h6>
                          <small className="text-muted">Revisa su perfil para más información</small>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button variant="outline-success" size="sm" onClick={() => handleAccept(notification.name)}>
                          <CheckCircle />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <Trash />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotificacionesAdmin;