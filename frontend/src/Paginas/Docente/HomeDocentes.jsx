import React from 'react';
import { Carousel, Alert } from 'react-bootstrap';
import NavegadorDocente from '../../Componentes/NavegadorDocente';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tenerlo en tu proyecto

const HomeDocentes = () => {
  return (
    <div className="d-flex">
      <NavegadorDocente />

      {/* Contenido principal */}
      <div className="flex-grow-1 p-5">
        <div className="container">
          <h2 className="text-center mb-4">Bienvenido al Sistema de Gestión de Servicios Sociales</h2>



          {/* Alertas */}
          <Alert variant="info">
            <strong>¡Bienvenido!</strong> Aquí puedes gestionar las horas de servicio social de los estudiantes y gestionar campañas.
          </Alert>

          {/* Información */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">¿Cómo Funciona el Sistema?</h5>
              <p>
                Este sistema está diseñado para ayudarte a gestionar las horas de servicio social de los estudiantes y administrar campañas. Aquí podrás subir tus solicitudes de acompañamiento.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomeDocentes;
