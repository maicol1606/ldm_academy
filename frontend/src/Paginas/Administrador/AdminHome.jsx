import React from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";

export default function AdminHome() {
  return (
    <div>
      <NavegacionAdmin /> {/**/}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Panel de Estadísticas</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">Estudiantes Postulados</div>
              <div className="card-body">
                <h5 className="card-title">25</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Estudiantes Finalizados</div>
              <div className="card-body">
                <h5 className="card-title">10</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning mb-3">
              <div className="card-header">Estudiantes en Proceso</div>
              <div className="card-body">
                <h5 className="card-title">15</h5>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mt-5">Estudiantes y Estado</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Campaña</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: "Juan Pérez", campaign: "Campaña 1", status: "Finalizado" },
              { id: 2, name: "Ana López", campaign: "Campaña 2", status: "En Proceso" },
              { id: 3, name: "Carlos Ruiz", campaign: "Campaña 3", status: "Postulado" },
            ].map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.campaign}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
