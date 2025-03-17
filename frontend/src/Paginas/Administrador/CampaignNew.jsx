import React, { useState } from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";

export default function CampaignNew() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nueva campaña agregada:\nNombre: ${name}\nDescripción: ${description}\nUbicación: ${location}`);
    setName("");
    setDescription("");
    setLocation("");
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <NavegacionAdmin />
      <div className="container mt-4">
        <div className="card shadow-lg p-4">
          <h2 className="text-center text-primary mb-4">
            <i className="far fa-address-card"></i> &nbsp; Nueva Campaña
          </h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="form-group">
              <label htmlFor="campaign_name">Nombre de la campaña</label>
              <input
                type="text"
                className="form-control"
                id="campaign_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="campaign_description">Descripción</label>
              <textarea
                className="form-control"
                id="campaign_description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="campaign_location">Ubicación</label>
              <select
                className="form-control"
                id="campaign_location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="" disabled>Seleccione el lugar</option>
                <option value="Coordinación">Coordinación</option>
                <option value="Salón">Salón</option>
                <option value="Comedor">Comedor</option>
                <option value="Orientación">Orientación</option>
                <option value="Biblioteca">Biblioteca</option>
              </select>
            </div>

            <div className="text-center mt-4">
              <button type="reset" className="btn btn-secondary me-2">
                <i className="fas fa-paint-roller"></i> &nbsp; Limpiar
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="far fa-save"></i> &nbsp; Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}