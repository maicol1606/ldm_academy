import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
import { FaClock, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

const Horas = () => {
  const [asistencias, setAsistencias] = useState([]);
  const idEstudiante = localStorage.getItem('id_usuario');

  const fetchDatos = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/asistencia/mostrarAsistencias/${idEstudiante}`);
      setAsistencias(res.data); // ahora es un array
    } catch (err) {
      console.error('Error al cargar los datos del estudiante', err);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);
  const horasRealizadas = asistencias.reduce((total, a) => total + a.horas, 0) || 0;

  const horasTotales = 120; // Asumimos 120 como regla
  const horasExtra = horasRealizadas > horasTotales ? horasRealizadas - horasTotales : 0;

  
    return (
      <div className="d-flex">
        <NavegacionEstudiante />
        <div className="container" style={{ marginLeft: '260px' }}>
          <section id="horas" className="mt-5">
            <h2 className="text-center mb-4">Gestión de Horas de Servicio Social</h2>
  
            <div className="row text-center mb-4">
              <div className="col-md-4">
                <div className="card p-3">
                  <FaRegClock size={30} className="mb-2" />
                  <h5>Total de Horas al realizar</h5>
                  <p>{horasTotales} horas</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <FaClock size={30} className="mb-2" />
                  <h5>Horas Realizadas</h5>
                  <p>{horasRealizadas} horas</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <FaRegCalendarAlt size={30} className="mb-2" />
                  <h5>Horas Extra</h5>
                  <p>{horasExtra} horas</p>
                </div>
              </div>
            </div>
  
            <div className="mb-5">
            <h4>Registro de Horas</h4>
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora de Inicio</th>
                  <th>Hora de Fin</th>
                  <th>Horas</th>
                  <th>Novedades</th>
                </tr>
              </thead>
              <tbody>
              {asistencias.map((a, i) => (
                <tr key={i}>
                   <td>{new Date(a.fecha).toLocaleDateString()}</td>
                   <td>{new Date(`1970-01-01T${a.hora_Inicio}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                   <td>{new Date(`1970-01-01T${a.hora_fin}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{a.horas}</td>
                  <td>{a.novedades || '—'}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Horas;
  
