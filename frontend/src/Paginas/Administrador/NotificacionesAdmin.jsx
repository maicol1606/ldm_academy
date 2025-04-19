import React, { useState, useEffect } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, Alert, Modal } from 'react-bootstrap';
import { Trash, CheckCircle, Eye, EyeSlash } from 'react-bootstrap-icons';
import axios from 'axios';

const NotificacionesAdmin = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [alert, setAlert] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [idEstudiante, setIdEstudiante] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalNotification, setModalNotification] = useState(null);

  useEffect(() => {
    const nombre = localStorage.getItem('nombreEstudiante') || 'Estudiante';
    const id = localStorage.getItem('idUsuario');
    setEstudianteNombre(nombre);
    setIdEstudiante(id);

    axios
      .get('http://localhost:3000/api/notificaciones')
      .then((res) => {
        console.log('Datos de la API:', res.data);
        if (Array.isArray(res.data)) {
          setNotifications(res.data);
        } else {
          console.error('La respuesta de la API no es un array');
        }
      })
      .catch((err) => {
        console.error('Error al obtener notificaciones:', err.response || err.message);
      });
  }, []);

  const handleAccept = (id) => {
    axios
      .put(`http://localhost:3000/api/notificaciones/${id}`, { estado: 'Aceptado' })
      .then((res) => {
        setAlertType('success');
        setAlert('Notificación aceptada correctamente');
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id ? { ...notification, estado: 'Aceptado' } : notification
          )
        );
        setTimeout(() => setAlert(''), 3000);
      })
      .catch((err) => {
        setAlertType('danger');
        setAlert('Error al aceptar la notificación');
        setTimeout(() => setAlert(''), 3000);
      });
  };

  const handleReject = (id) => {
    axios
      .put(`http://localhost:3000/api/notificaciones/${id}`, { estado: 'Rechazado' })
      .then((res) => {
        setAlertType('danger');
        setAlert('Notificación rechazada');
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id ? { ...notification, estado: 'Rechazado' } : notification
          )
        );
        setTimeout(() => setAlert(''), 3000);
      })
      .catch((err) => {
        setAlertType('danger');
        setAlert('Error al rechazar la notificación');
        setTimeout(() => setAlert(''), 3000);
      });
  };

  const showDetails = (notification) => {
    setModalNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalNotification(null);
  };

  const togglePerfil = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, perfilVisible: !n.perfilVisible } : n
      )
    );
  };

  const filteredNotifications = notifications.filter(n =>
    (searchTerm === '' || 
      (n.nombre_estudiante && n.nombre_estudiante.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (n.campaña && n.campaña.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (n.id && String(n.id).toLowerCase().includes(searchTerm.toLowerCase())) ||
      (n.idEstudiante && String(n.idEstudiante).toLowerCase().includes(searchTerm.toLowerCase()))
    ) && 
    (campaignFilter === '' || n.campaña === campaignFilter)
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

          <table className="table table-bordered table-striped mt-3">
            <thead>
              <tr>
                <th>ID Estudiante</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Campaña</th>
                <th>Fecha de Postulación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.idEstudiante}</td>
                  <td>{notification.id}</td>
                  <td>{notification.nombre_estudiante || 'No disponible'}</td>
                  <td>{notification.campaña || 'No disponible'}</td>
                  <td>{notification.fecha_postulacion || 'No disponible'}</td>
                  <td>{notification.estado || 'No disponible'}</td>
                  <td>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleAccept(notification.id)}
                    >
                      <CheckCircle />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleReject(notification.id)}
                    >
                      <Trash />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => showDetails(notification)}
                    >
                      <Eye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      {modalNotification && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de la Notificación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>ID Estudiante:</strong> {modalNotification.idEstudiante}</p>
            <p><strong>ID Notificación:</strong> {modalNotification.id}</p>
            <p><strong>Nombre Estudiante:</strong> {modalNotification.nombre_estudiante}</p>
            <p><strong>Campaña:</strong> {modalNotification.campaña}</p>
            <p><strong>Fecha de Postulación:</strong> {modalNotification.fecha_postulacion}</p>
            <p><strong>Estado:</strong> {modalNotification.estado}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
};

export default NotificacionesAdmin;
