import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InformacionCampaña = () => {
  const [campañas] = useState([
    { nombre: "Comedor", imagen: "https://via.placeholder.com/150", horas: 3, motivo: "Se asignan 3 horas porque es una actividad moderada y no requiere esfuerzo físico constante." },
    { nombre: "Salón", imagen: "https://via.placeholder.com/150", horas: 4, motivo: "Se asignan 4 horas debido a las múltiples actividades realizadas dentro de los salones." },
    { nombre: "Biblioteca", imagen: "https://via.placeholder.com/150", horas: 2, motivo: "Se asignan 2 horas porque es una actividad de bajo esfuerzo y demanda menor tiempo." },
    { nombre: "Enfermería", imagen: "https://via.placeholder.com/150", horas: 5, motivo: "Se asignan 5 horas porque se requiere apoyo constante en situaciones de salud." },
    { nombre: "Coordinación", imagen: "https://via.placeholder.com/150", horas: 3, motivo: "Se asignan 3 horas debido a la naturaleza administrativa de las actividades." },
    { nombre: "Orientación", imagen: "https://via.placeholder.com/150", horas: 4, motivo: "Se asignan 4 horas por el apoyo necesario en tareas relacionadas con los estudiantes." },
  ]);

  const [campañaSeleccionada, setCampañaSeleccionada] = useState(null);

  const abrirVentana = (campaña) => {
    setCampañaSeleccionada(campaña);
  };

  const cerrarVentana = () => {
    setCampañaSeleccionada(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Información de las Campañas</h2>

      <div className="row">
        {campañas.map((campaña) => (
          <div key={campaña.nombre} className="col-12 col-sm-6 col-md-4 mb-4">
            <div
              className="card shadow-lg border-0"
              style={{
                cursor: "pointer",
                transition: "transform 0.3s",
                borderRadius: "12px",
              }}
              onClick={() => abrirVentana(campaña)}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={campaña.imagen}
                className="card-img-top rounded-top"
                alt={campaña.nombre}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="fw-bold">{campaña.nombre}</h5>
                <button className="btn btn-primary">Más información</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {campañaSeleccionada && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="card p-4 shadow-lg"
            style={{
              width: "90%",
              maxWidth: "450px",
              textAlign: "center",
            }}
          >
            <button
              onClick={cerrarVentana}
              className="btn-close position-absolute top-0 end-0 m-2"
            ></button>
            <img
              src={campañaSeleccionada.imagen}
              alt={campañaSeleccionada.nombre}
              className="rounded img-fluid mb-3"
            />
            <h3 className="fw-bold">{campañaSeleccionada.nombre}</h3>
            <p><strong>Horas asignadas:</strong> {campañaSeleccionada.horas}</p>
            <p><strong>Motivo:</strong> {campañaSeleccionada.motivo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformacionCampaña;
