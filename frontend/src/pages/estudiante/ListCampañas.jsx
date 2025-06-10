import React, { useState } from "react";
import { Card, Button, Row, Col, Badge, Container } from 'react-bootstrap';

const ListCampañas = () => {
  const [campañas] = useState([
    { nombre: "Comedor", postulados: 5, participantes: 3, descripcion: "Repartir almuerzos y supervisar que los estudiantes no desperdicien comida." },
    { nombre: "Salón", postulados: 2, participantes: 8, descripcion: "Mantener el orden en los salones y colaborar con actividades." },
    { nombre: "Biblioteca", postulados: 4, participantes: 2, descripcion: "Organizar libros y ayudar a estudiantes con consultas." },
    { nombre: "Enfermería", postulados: 3, participantes: 1, descripcion: "Asistir al personal de salud en tareas básicas." },
    { nombre: "Coordinación", postulados: 6, participantes: 4, descripcion: "Ayudar en la gestión administrativa y tareas del coordinador." },
    { nombre: "Orientación", postulados: 3, participantes: 2, descripcion: "Asistir en actividades de orientación y apoyo a estudiantes." }
  ]);

  const [campañasPostuladas, setCampañasPostuladas] = useState([]);

  const enviarNotificacion = async (nombreCampaña) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/notificaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: `Un estudiante se ha postulado a la campaña ${nombreCampaña}`,
          rol_destino: "Docente", //
        }),
      });

      if (response.ok) {
      } else {
        console.error("Error al enviar la notificación");
      }
    } catch (error) {
      console.error("Error de conexión", error);
    }
  };

  const handlePostularse = (nombreCampaña) => {
    if (!campañasPostuladas.includes(nombreCampaña)) {
      setCampañasPostuladas([...campañasPostuladas, nombreCampaña]);
      enviarNotificacion(nombreCampaña); // Llamamos la función para notificar
    }
  };

  return (
    <div className="d-flex">
      <Container className="mt-4">
        <h2 className="text-center mb-4">Lista de Campañas</h2>
        <Row className="g-4">
          {campañas.map((campaña) => (
            <Col key={campaña.nombre} xs={12} sm={6} md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{campaña.nombre}</Card.Title>
                  <Card.Text>{campaña.descripcion}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="primary">Postulados: {campaña.postulados}</Badge>
                    <Badge bg="success">Participantes: {campaña.participantes}</Badge>
                  </div>
                  <div className="text-center mt-3">
                    {campañasPostuladas.includes(campaña.nombre) ? (
                      <Badge bg="warning">En espera</Badge>
                    ) : (
                      <Button variant="dark" onClick={() => handlePostularse(campaña.nombre)}>
                        Postularse
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="mt-5">
          <h3>Campañas en las que te has postulado</h3>
          {campañasPostuladas.length > 0 ? (
            <ul className="list-group">
              {campañasPostuladas.map((campaña) => (
                <li key={campaña} className="list-group-item">{campaña}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No te has postulado a ninguna campaña.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ListCampañas;