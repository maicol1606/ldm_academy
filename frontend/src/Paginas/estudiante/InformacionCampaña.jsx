import React, { useState } from "react";
import NavegacionAdmin from '../../Componentes/NavegacionEstudiante';

const InfoCampaña = () => {
  // Datos simulados de las campañas
  const [campañas] = useState([
    {
      nombre: "Comedor",
      imagen: "https://via.placeholder.com/150",
      horas: 3,
      motivo: "Se asignan 3 horas porque es una actividad moderada y no requiere esfuerzo físico constante.",
    },
    {
      nombre: "Salón",
      imagen: "https://via.placeholder.com/150",
      horas: 4,
      motivo: "Se asignan 4 horas debido a las múltiples actividades realizadas dentro de los salones.",
    },
    {
      nombre: "Biblioteca",
      imagen: "https://via.placeholder.com/150",
      horas: 2,
      motivo: "Se asignan 2 horas porque es una actividad de bajo esfuerzo y demanda menor tiempo.",
    },
    {
      nombre: "Enfermería",
      imagen: "https://via.placeholder.com/150",
      horas: 5,
      motivo: "Se asignan 5 horas porque se requiere apoyo constante en situaciones de salud.",
    },
    {
      nombre: "Coordinación",
      imagen: "https://via.placeholder.com/150",
      horas: 3,
      motivo: "Se asignan 3 horas debido a la naturaleza administrativa de las actividades.",
    },
    {
      nombre: "Orientación",
      imagen: "https://via.placeholder.com/150",
      horas: 4,
      motivo: "Se asignan 4 horas por el apoyo necesario en tareas relacionadas con los estudiantes.",
    },
  ]);

  // Estado para manejar la ventana emergente
  const [campañaSeleccionada, setCampañaSeleccionada] = useState(null);

  // Función para abrir la ventana emergente
  const abrirVentana = (campaña) => {
    setCampañaSeleccionada(campaña);
  };

  // Función para cerrar la ventana emergente
  const cerrarVentana = () => {
    setCampañaSeleccionada(null);
  };

  return (
    <div>
      <h2>Información de las Campañas</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {campañas.map((campaña) => (
          <div
            key={campaña.nombre}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
            onClick={() => abrirVentana(campaña)}
          >
            <img src={campaña.imagen} alt={campaña.nombre} style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{campaña.nombre}</h3>
          </div>
        ))}
      </div>

      {campañaSeleccionada && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={cerrarVentana}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <img
              src={campañaSeleccionada.imagen}
              alt={campañaSeleccionada.nombre}
              style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
            />
            <h3>{campañaSeleccionada.nombre}</h3>
            <p><strong>Horas asignadas:</strong> {campañaSeleccionada.horas}</p>
            <p><strong>Motivo:</strong> {campañaSeleccionada.motivo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCampaña;
