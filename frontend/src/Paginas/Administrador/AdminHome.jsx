import React, { useEffect, useState } from "react";
import axios from "axios";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import "./App.css"; // Asegúrate de tener este archivo CSS para estilos adicionales

const EstadisticasDashboard = () => {
  const [datos, setDatos] = useState({
    total: 0,
    finalizados: 0,
    enProceso: 0,
    postulados: 0,
  });
  
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    // Cargar estadísticas
    axios.get("http://localhost:3000/api/obtenerEstadisticas")
      .then(res => setDatos(res.data))
      .catch(err => {
        console.error("Error al cargar estadísticas:", err);
      });

    // Cargar estudiantes
    axios.get("http://localhost:3000/api/estudiantes/llamarEstudiantes")
      .then(res => setEstudiantes(res.data))
      .catch(err => {
        console.error("Error al obtener estudiantes:", err);
        setEstudiantes([]);
      });
  }, []);

  return (
    <div className=" ">
      <NavegacionAdmin />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Panel de Estadísticas</h2>

        <div className="row">
          <div className="col-md-3">
            <div className="card bg-card-blue mb-3">
              <div className="card-header text-center font-weight-bold">Total de Estudiantes</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.total}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success mb-3">
              <div className="card-header text-center font-weight-bold">Finalizados</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.finalizados}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning text-dark mb-3">
              <div className="card-header text-center font-weight-bold">En Proceso</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.enProceso}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-info text-dark mb-3">
              <div className="card-header text-center font-weight-bold">Postulados</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.postulados}</h5>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-center mb-4">Lista de Estudiantes</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Curso</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((usuario, index) => (
                <tr key={usuario.id_usuario}>
                  <td>{index + 1}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.curso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasDashboard;