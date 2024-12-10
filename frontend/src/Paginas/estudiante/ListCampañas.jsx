import React, { useState } from "react";
import NavegacionAdmin from '../../Componentes/NavegacionEstudiante';

const ListCampaña = () => {
  // Datos simulados de las campañas
  const [campañas] = useState([
    {
      nombre: "Comedor",
      postulados: 5,
      participantes: 3,
      descripcion: "Repartir almuerzos y supervisar que los estudiantes no desperdicien comida.",
    },
    {
      nombre: "Salón",
      postulados: 2,
      participantes: 2,
      descripcion: "Mantener el orden en los salones y colaborar con actividades.",
    },
    {
      nombre: "Biblioteca",
      postulados: 4,
      participantes: 2,
      descripcion: "Organizar libros y ayudar a estudiantes con consultas.",
    },
    {
      nombre: "Enfermería",
      postulados: 3,
      participantes: 1,
      descripcion: "Asistir al personal de salud en tareas básicas.",
    },
    {
      nombre: "Coordinación",
      postulados: 6,
      participantes: 4,
      descripcion: "Ayudar en la gestión administrativa y tareas del coordinador.",
    },
    {
      nombre: "Orientación",
      postulados: 3,
      participantes: 2,
      descripcion: "Asistir en actividades de orientación y apoyo a estudiantes.",
    },
  ]);

  const [campañasPostuladas, setCampañasPostuladas] = useState([]);

  const handlePostularse = (nombreCampaña) => {
    if (!campañasPostuladas.includes(nombreCampaña)) {
      setCampañasPostuladas([...campañasPostuladas, nombreCampaña]);
    }
  };

  return (
    <div>
      <h2>Lista de Campañas</h2>
      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Postulados</th>
            <th>Participantes</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {campañas.map((campaña) => (
            <tr key={campaña.nombre}>
              <td>{campaña.nombre}</td>
              <td>{campaña.postulados}</td>
              <td>{campaña.participantes}</td>
              <td>{campaña.descripcion}</td>
              <td>
                {campañasPostuladas.includes(campaña.nombre) ? (
                  <span>En espera</span>
                ) : (
                  <button onClick={() => handlePostularse(campaña.nombre)}>Postularse</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Campañas en las que te has postulado</h3>
      {campañasPostuladas.length > 0 ? (
        <ul>
          {campañasPostuladas.map((campaña) => (
            <li key={campaña}>{campaña}</li>
          ))}
        </ul>
      ) : (
        <p>No te has postulado a ninguna campaña.</p>
      )}
    </div>
  );
};

export default ListCampaña;
