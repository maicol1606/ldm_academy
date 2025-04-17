import React, { useEffect, useState } from "react";
import axios from "axios";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";


const EstadisticasDashboard = () => {
  const [datos, setDatos] = useState({

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
    <div>
      <NavegacionAdmin />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Panel de Estadísticas</h2>

        <div className="row">
          <div className="col-md-3">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">Total de Estudiantes</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.total}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Finalizados</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.finalizados}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-warning mb-3">
              <div className="card-header">En Proceso</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.enProceso}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">Postulados</div>
              <div className="card-body">
                <h5 className="card-title text-center">{datos.postulados}</h5>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-center mb-4">Lista de Estudiantes</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped text-center">
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
