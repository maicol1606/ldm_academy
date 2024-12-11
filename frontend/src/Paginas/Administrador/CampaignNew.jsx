import React, { useState } from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
export default function CampaignNew() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nueva campaña agregada:\nNombre: ${name}\nDescripción: ${description}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agregar Nueva Campaña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Nombre de la Campaña</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Ingrese el nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Ingrese la descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
