import React from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
export default function CampaignList() {
  return (
    
    <div className="container-fluid">
      <NavegacionAdmin />
    <div className="table-responsive">
        <table className="table table-dark table-sm">
            <thead>
                <tr className="text-center roboto-medium">
                    <th>#</th>
                    <th>CÓDIGO</th>
                    <th>NOMBRE</th>
                    <th>ESTUDIANTES REQUERIDOS</th>
                    <th>ACTUALIZAR</th>
                    <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(9)].map((_, index) => (
                    <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>012342567</td>
                        <td>Nombre</td>
                        <td>20</td>
                        <td>
                            <a href="campaña-update.html" className="btn btn-success">
                                <i className="fas fa-sync-alt"></i>
                            </a>
                        </td>
                        <td>
                            <button type="button" className="btn btn-warning">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">
                    Atrás
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                    1
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                    2
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                    3
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                    Siguiente
                </a>
            </li>
        </ul>
    </nav>
</div>
);
};