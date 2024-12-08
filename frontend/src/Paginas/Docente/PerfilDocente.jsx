import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Table } from 'react-bootstrap';

const PerfilDocente = () => {
  const [docente, setDocente] = useState({
    nombre: 'Juanes',
    id: '12345',
    correo: 'juanes@gmail.com',
    estudiantesAsignados: 12,
    campañas: ['Comedor'],
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [newCorreo, setNewCorreo] = useState(docente.correo);

  const manejarEditar = () => {
    setIsEditing(true);
  };

  const manejarGuardar = () => {
    setDocente({ ...docente, correo: newCorreo });
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Perfil del Docente</h2>
      <Card>
        <Card.Body>
          <Card.Title>{docente.nombre}</Card.Title>
          <Card.Text>
            <strong>ID: </strong>{docente.id}
          </Card.Text>
          <Card.Text>
            <strong>Correo: </strong>
            {isEditing ? (
              <Form.Control
                type="email"
                value={newCorreo}
                onChange={(e) => setNewCorreo(e.target.value)}
              />
            ) : (
              docente.correo
            )}
          </Card.Text>
          <Card.Text>
            <strong>Estudiantes Asignados: </strong>{docente.estudiantesAsignados}
          </Card.Text>
          <Card.Text>
            <strong>Campañas Asignadas: </strong>
            {docente.campañas.join(', ')}
          </Card.Text>

          {isEditing ? (
            <Button variant="success" onClick={manejarGuardar}>Guardar</Button>
          ) : (
            <Button variant="primary" onClick={manejarEditar}>Editar Perfil</Button>
          )}
        </Card.Body>
      </Card>

      <h3>Estudiantes Asignados</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre del Estudiante</th>
            <th>ID del Estudiante</th>
            <th>Campaña</th>
          </tr>
        </thead>
        <tbody>
          {/* mapeo de la lista de estudiantes asignados */}
          {[...Array(docente.estudiantesAsignados)].map((_, index) => (
            <tr key={index}>
              <td>Estudiante {index + 1}</td>
              <td>{`ID${index + 1000}`}</td>
              <td>{docente.campañas[index % docente.campañas.length]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PerfilDocente;
