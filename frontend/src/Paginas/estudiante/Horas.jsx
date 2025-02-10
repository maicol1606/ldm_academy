import React from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
import { FaClock, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

const Horas = () => {
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
                <h5>Horas Mensuales</h5>
                <p>XX horas</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <FaClock size={30} className="mb-2" />
                <h5>Horas Registradas</h5>
                <p>XX horas</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <FaRegCalendarAlt size={30} className="mb-2" />
                <h5>Horas Extra</h5>
                <p>XX horas</p>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h4>Registro de Horas</h4>
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Fecha</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Nombre de Campaña</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lunes</td>
                  <td>01/02/2024</td>
                  <td>08:00 AM</td>
                  <td>12:00 PM</td>
                  <td>Campaña</td>
                </tr>
                <tr>
                  <td>Martes</td>
                  <td>02/02/2024</td>
                  <td>09:00 AM</td>
                  <td>01:00 PM</td>
                  <td>Campaña </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Horas;
