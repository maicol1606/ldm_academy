import React from "react";
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
const PerfilEstudiante = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
      <NavegacionEstudiante />

        {/* Contenido del perfil */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Foto del Estudiante"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <button className="btn btn-primary">Editar Foto</button>
                </div>
                <div className="col-md-8">
                  <h3>Nombre del Estudiante</h3>
                  <p>
                    <strong>Correo:</strong> estudiante@example.com
                  </p>
                  <p>
                    <strong>Matrícula:</strong> 123456789
                  </p>
                  <button className="btn btn-secondary mt-3">Editar Perfil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilEstudiante;
