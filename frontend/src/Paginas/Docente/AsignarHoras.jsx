import React, { useState } from 'react';

const AsignarHoras = () => {
  // Estado para gestionar el estudiante y las horas asignadas
  const [estudiante, setEstudiante] = useState({
    id: 1,
    nombre: 'Juan Pérez',
    numeroIdentificacion: '123456789',
    horasAsignadas: 3, // Suponiendo que ya tiene 3 horas asignadas
  });

  const [nuevasHoras, setNuevasHoras] = useState(0); // Horas que el docente quiere asignar

  // Función para manejar el cambio de horas
  const handleHorasChange = (e) => {
    setNuevasHoras(e.target.value);
  };

  // Función para actualizar las horas
  const asignarHoras = () => {
    const totalHoras = estudiante.horasAsignadas + parseInt(nuevasHoras);
    if (totalHoras <= 5) {
      setEstudiante({
        ...estudiante,
        horasAsignadas: totalHoras,
      });
      setNuevasHoras(0); // Limpiar el campo de horas después de asignar
      alert('Horas asignadas con éxito');
    } else {
      alert('No puedes asignar más de 5 horas.');
    }
  };

  return (
    <div className="d-flex">
      {/* Menú estático */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
        <h4 className="mb-4">Menú</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a href="#servicios" className="nav-link active">Información de Servicios Sociales</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#login" className="nav-link">Login</a>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="container" style={{ marginLeft: '260px' }}>
        <h2 className="text-center mb-4">Asignar Horas al Estudiante</h2>

        {/* Información del estudiante */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Información del Estudiante</h5>
            <p><strong>Nombre:</strong> {estudiante.nombre}</p>
            <p><strong>Número de Identificación:</strong> {estudiante.numeroIdentificacion}</p>
            <p><strong>Horas Asignadas:</strong> {estudiante.horasAsignadas} horas</p>
          </div>
        </div>

        {/* Formulario para asignar horas */}
        <div className="mb-4">
          <label htmlFor="horas" className="form-label">Horas a asignar</label>
          <input
            type="number"
            className="form-control"
            id="horas"
            value={nuevasHoras}
            onChange={handleHorasChange}
            max="5"
            min="1"
          />
        </div>

        <button className="btn btn-primary" onClick={asignarHoras}>Asignar Horas</button>
      </div>
    </div>
  );
};

export default AsignarHoras;
