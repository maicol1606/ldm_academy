import React from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";

export default function CampaignList() {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <NavegacionAdmin />
      <div className="container mt-4">
        <div className="card shadow-lg p-3">
          <h2 className="text-center text-primary mb-4">
            <i className="fas fa-bullhorn"></i> Lista de Campañas
          </h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark text-center">
                <tr className="roboto-medium">
                  <th>#</th>
                  <th><i className="fas fa-barcode"></i> Código</th>
                  <th><i className="fas fa-tag"></i> Nombre</th>
                  <th><i className="fas fa-users"></i> Estudiantes Requeridos</th>
                  <th><i className="fas fa-edit"></i> Actualizar</th>
                  <th><i className="fas fa-trash-alt"></i> Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(9)].map((_, index) => (
                  <tr key={index} className="text-center align-middle">
                    <td>{index + 1}</td>
                    <td>012342567</td>
                    <td>Campaña {index + 1}</td>
                    <td>20</td>
                    <td>
                      <a href="campaña-update.html" className="btn btn-success btn-sm">
                        <i className="fas fa-sync-alt"></i> Actualizar
                      </a>
                    </td>
                    <td>
                      <button type="button" className="btn btn-danger btn-sm">
                        <i className="far fa-trash-alt"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación Mejorada */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link">Atrás</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Siguiente</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
