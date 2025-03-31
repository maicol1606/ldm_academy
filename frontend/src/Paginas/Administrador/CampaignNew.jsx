import React, { useState } from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";

export default function CampaignNew() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [studentsRequired, setStudentsRequired] = useState("");
  const [startDate, setStartDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nueva campaña agregada:\nDescripción: ${description}\nUbicación: ${location}\nEstudiantes requeridos: ${studentsRequired}\nInicio: ${startDate}\nDocente: ${teacher}\nJornada: ${schedule}`);
    setDescription("");
    setLocation("");
    setStudentsRequired("");
    setStartDate("");
    setTeacher("");
    setSchedule("");
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

            <div className="form-group mt-3">
              <label htmlFor="students_required">Estudiantes requeridos</label>
              <input
                type="number"
                className="form-control"
                id="students_required"
                value={studentsRequired}
                onChange={(e) => setStudentsRequired(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="start_date">Inicio de la campaña</label>
              <input
                type="date"
                className="form-control"
                id="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="teacher">Docente a cargo</label>
              <select
                className="form-control"
                id="teacher"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                required
              >
                <option value="" disabled>Seleccione un docente</option>
                <option value="Docente 1">Docente 1</option>
                <option value="Docente 2">Docente 2</option>
                <option value="Docente 3">Docente 3</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label>Jornada</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="schedule"
                  id="morning"
                  value="Mañana"
                  onChange={(e) => setSchedule(e.target.value)}
                  required
                />
                <label className="form-check-label" htmlFor="morning">
                  Mañana
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="schedule"
                  id="afternoon"
                  value="Tarde"
                  onChange={(e) => setSchedule(e.target.value)}
                  required
                />
                <label className="form-check-label" htmlFor="afternoon">
                  Tarde
                </label>
              </div>
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
