import React, { useState } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, Alert, Dropdown } from 'react-bootstrap';
import { Trash, CheckCircle, Eye, EyeSlash, Bell } from 'react-bootstrap-icons';

const NotificacionesAdmin = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1123132132',
      name: 'Zinzu Chan Lee',
      campaign: 'Comedor',
      avatar: './assets/avatar/avatar1.png',
      date: 'Hoy',
      jornada: 'Mañana',
      salon: 'Salon 101',
      perfilVisible: false,
    },
    {
      id: '278454152',
      name: 'Jeta Saru',
      campaign: 'Enfermería',
      avatar: './assets/avatar/avatar3.png',
      date: 'Hoy',
      jornada: 'Tarde',
      salon: 'Salon 102',
      perfilVisible: false,
    },
    {
      id: '345654654',
      name: 'Sonal Gharti',
      campaign: 'Salón',
      avatar: './assets/avatar/avatar4.png',
      date: 'Ayer',
      jornada: 'Mañana',
      salon: 'Salon 103',
      perfilVisible: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [alert, setAlert] = useState('');
  const [alertType, setAlertType] = useState('success');

  const handleAccept = (name) => {
    setAlertType('success');
    setAlert(`Has aceptado a ${name}`);
    setTimeout(() => setAlert(''), 3000);
  };

  const handleReject = (name) => {
    setAlertType('danger');
    setAlert(`Has rechazado a ${name}`);
    setTimeout(() => setAlert(''), 3000);
  };

  const togglePerfil = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, perfilVisible: !n.perfilVisible } : n
      )
    );
  };

  const filteredNotifications = notifications.filter(n =>
    (n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     n.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
     n.id.includes(searchTerm)) &&
    (campaignFilter === '' || n.campaign === campaignFilter)
  );

  const campaignOptions = [
    'Comedor',
    'Orientación',
    'Coordinación',
    'Biblioteca',
    'Enfermería',
    'Salón'
  ];

  return (
    <section className="container-fluid bg-light min-vh-100 p-3">
      <div className="row">
        <NavegacionAdmin />
        <div className="col-md-10 offset-md-2">
          <h4 className="fw-bold">Bienvenido, administrador</h4>
          <p className="text-muted">Tienes {notifications.length} notificaciones por revisar</p>

          {alert && (
            <Alert variant={alertType} className="mt-2">{alert}</Alert>
          )}

          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3 gap-2">
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, campaña o ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-100 w-md-50"
            />
            <Form.Select
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="w-100 w-md-25"
              value={campaignFilter}
            >
              <option value="">Buscar por campaña</option>
              {campaignOptions.map((campaña, i) => (
                <option key={i} value={campaña}>{campaña}</option>
              ))}
            </Form.Select>
          </div>

          {['Hoy', 'Ayer'].map((fecha) => (
            <div key={fecha}>
              <h6 className="text-muted mt-4">{fecha}</h6>
              {filteredNotifications
                .filter(n => n.date === fecha)
                .map((notification) => (
                  <Card key={notification.id} className="mb-3 shadow-sm border-0">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                            style={{ width: 40, height: 40 }}
                          >
                            <Bell />
                          </div>
                          <div>
                            <h6 className="mb-0">{notification.name} se postuló a {notification.campaign}</h6>
                            <small className="text-muted">ID: {notification.id} - Revisa su perfil para más información</small>
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleAccept(notification.name)}
                          >
                            <CheckCircle />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleReject(notification.name)}
                          >
                            <Trash />
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => togglePerfil(notification.id)}
                          >
                            {notification.perfilVisible ? <EyeSlash /> : <Eye />}
                          </Button>
                        </div>
                      </div>

                      {notification.perfilVisible && (
                        <div className="mt-3 p-3 border rounded bg-white">
                          <p><strong>Nombre:</strong> {notification.name}</p>
                          <p><strong>Jornada:</strong> {notification.jornada}</p>
                          <p><strong>Salón:</strong> {notification.salon}</p>
                          <p><strong>Campaña:</strong> {notification.campaign}</p>
                          <p><strong>ID:</strong> {notification.id}</p>
                        </div>
                      )}
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
