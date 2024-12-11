import React from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
export default function CampaignList() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Campañas</h2>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Nombre de la Campaña</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, name: "Campaña 1", description: "Descripción de la campaña 1" },
            { id: 2, name: "Campaña 2", description: "Descripción de la campaña 2" },
            { id: 3, name: "Campaña 3", description: "Descripción de la campaña 3" },
          ].map((campaign, index) => (
            <tr key={index}>
              <td>{campaign.id}</td>
              <td>{campaign.name}</td>
              <td>{campaign.description}</td>
              <td>
                <button className="btn btn-info btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
