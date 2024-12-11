import React from 'react';
import { Carousel, Button, Alert } from 'react-bootstrap';
import NavegadorDocente from '../../Componentes/NavegadorDocente';
import { Link } from 'react-router-dom';

const HomeDocentes = () => {
  return (
    <div className="d-flex">
      <NavegadorDocente />
      <div className='container justify-content-center p-5'>
        {/* Contenido principal */}
        <div className="">
          <h2 className="text-center mb-4">Bienvenido al Sistema de Gestión de Servicios Sociales</h2>

          {/* Carrusel  */}
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x300?text=Campañas+de+Servicios+Sociales"
                alt="Servicios Sociales"
              />
              <Carousel.Caption>
                <h3>Campañas Activas</h3>
                <p>Conoce las campañas disponibles para los estudiantes.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x300?text=Asignación+de+Horas"
                alt="Horas"
              />
              <Carousel.Caption>
                <h3>Asignación de Horas</h3>
                <p>Aprende cómo asignar horas a los estudiantes.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x300?text=Generación+de+Certificados"
                alt="Certificados"
              />
              <Carousel.Caption>
                <h3>Generación de Certificados</h3>
                <p>Emite certificados automáticamente cuando los estudiantes completen sus horas.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          {/* Alertas */}
          <Alert variant="info" className="mt-4">
            <strong>¡Bienvenido!</strong> Aquí puedes gestionar las horas de servicio social de los estudiantes, gestionar campañas y generar certificados.
          </Alert>

          {/* Información  */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">¿Cómo Funciona el Sistema?</h5>
              <p>Este sistema está diseñado para ayudar a los docentes a gestionar las horas de servicio social de los estudiantes, gestionar campañas y generar certificados.</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDocentes;
