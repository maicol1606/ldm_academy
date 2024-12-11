import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavegadorDocente from '../../Componentes/NavegadorDocente';

function CrearCampaña() {
  const [nombreCampaña, setNombreCampaña] = useState('');
  const [numEstudiantes, setNumEstudiantes] = useState(0);
  const [especificaciones, setEspecificaciones] = useState('');
  const [informacion, setInformacion] = useState('');
  const [fotoCampaña, setFotoCampaña] = useState(null);
  const [idCampaña, setIdCampaña] = useState(generateId());

  // Función para generar un ID único
  function generateId() {
    return 'ID-' + Math.random().toString(36).substr(2, 9);
  }

  const handleFileChange = (e) => {
    setFotoCampaña(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí, en un escenario real, enviarías la información a un servidor o base de datos.
    alert('Campaña creada exitosamente');
  };

  return (
    <div className="container mt-5">
      <NavegadorDocente />
      <h2>Crear Nueva Campaña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreCampaña">Nombre de la campaña</label>
          <input
            type="text"
            className="form-control"
            id="nombreCampaña"
            value={nombreCampaña}
            onChange={(e) => setNombreCampaña(e.target.value)}
            placeholder="Ingrese el nombre de la campaña"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numEstudiantes">Número de cupos</label>
          <input
            type="number"
            className="form-control"
            id="numEstudiantes"
            value={numEstudiantes}
            onChange={(e) => setNumEstudiantes(e.target.value)}
            placeholder="Ingrese el número de estudiantes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="especificaciones">Especificaciones de la campaña</label>
          <textarea
            className="form-control"
            id="especificaciones"
            rows="3"
            value={especificaciones}
            onChange={(e) => setEspecificaciones(e.target.value)}
            placeholder="Ingrese las especificaciones"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="informacion">Información adicional</label>
          <textarea
            className="form-control"
            id="informacion"
            rows="3"
            value={informacion}
            onChange={(e) => setInformacion(e.target.value)}
            placeholder="Información adicional sobre la campaña"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="fotoCampaña">Subir foto de la campaña</label>
          <input
            type="file"
            className="form-control-file"
            id="fotoCampaña"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Crear Campaña
        </button>
      </form>
    </div>
  );
}

export default CrearCampaña;
