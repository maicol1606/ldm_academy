import React from "react";

const PerfilEstudiante = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Menú lateral */}
        <div className="col-md-3">
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action">
              Página Principal
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Campañas
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Certificados
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Ver Horas
            </a>
            <a href="#" className="list-group-item list-group-item-action active">
              Perfil
            </a>
            <a href="#" className="list-group-item list-group-item-action text-danger">
              Logout
            </a>
          </div>
        </div>

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
