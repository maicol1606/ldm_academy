import React, { useState } from "react";
import axios from "axios";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CertificadoAdmin = () => {
  
  const [datos, setDatosEstudiante] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [mostrar, setMostrarEstudiante] = useState(false);

  const [idUsuario, setIdUsuario] = useState("");

  const handleBuscarEstudiante = async (e) => {
    const valor = e.target.value;
    setIdUsuario(valor);
  
    if (valor.length === 4) {
      try {
        const response = await axios.get(`http://localhost:3000/api/asistencia/obtenerAsistencias/${valor}`);
        setDatosEstudiante(response.data);
        setMostrarEstudiante(true);
      } catch (error) {
        console.error("Error al obtener datos del estudiante:", error);
        setMostrarEstudiante(false);
      }
    } else {
      setMostrarEstudiante(false);
    }
  };

  const generarPDF = () => {
    if (!datos) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Certificación de Servicio Social", 50, 20);
    doc.setFontSize(12);
    doc.text(`Nombre del Estudiante: ${datos.nombre}`, 20, 40);
    doc.text(`Horas Cumplidas: ${datos.horasCumplidas}`, 20, 50);
    doc.text(`Promedio de Horas: ${datos.promedioHoras}`, 20, 60);
    doc.text(`Inicio del Servicio: ${datos.inicioServicio}`, 20, 70);
    doc.text(`Fin del Servicio: ${datos.finServicio}`, 20, 80);
    doc.text(`Campaña: ${datos.campaña}`, 20, 90);
    doc.text(`Docente: ${datos.docente}`, 20, 100);
    doc.text(`Descripción: ${descripcion}`, 20, 110);
    doc.save(`Certificado_${datos.nombre}.pdf`);

    registrarCertificado();
  };

  const registrarCertificado = async () => {
    try {
      const payload = {
        id_usuario: idUsuario, // ✅ aquí va idUsuario
        id_campaña: datos.id_campaña, // asegúrate que `id_campaña` venga en los datos
        descripcion,
      };
      await axios.post("http://localhost:3000/api/certificados/agregarCertificado", payload);
      alert("Certificado registrado correctamente.");
    } catch (error) {
      console.error("Error al registrar certificado:", error);
      alert("Error al registrar certificado.");
    }
  };
  

  return (
    <div className="container-fluid bg-light min-vh-100">
      <NavegacionAdmin />
      <div className="d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4 mt-4 w-75">
          <h2 className="text-center text-primary mb-4">
            <i className="fas fa-certificate"></i> Generar Certificación
          </h2>
          <form autoComplete="off">
            <fieldset>
              <legend className="text-secondary">
                <i className="far fa-file-alt"></i> Datos del Estudiante
              </legend>
              <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="ID del usuario (estudiante)"
    maxLength="6"
    value={idUsuario}
    onChange={handleBuscarEstudiante}
  />
</div>

              {mostrar && datos && (
                <div className="border p-3 rounded bg-white">
                  <p><strong>Nombre:</strong> {datos.nombre}</p>
                  <p><strong>Horas cumplidas:</strong> {datos.horasCumplidas}</p>
                  <p><strong>Promedio diario:</strong> {datos.promedioHoras}</p>
                  <p><strong>Inicio:</strong> {datos.inicioServicio}</p>
                  <p><strong>Fin:</strong> {datos.finServicio}</p>
                  <p><strong>Campaña:</strong> {datos.campaña}</p>
                  <p><strong>Docente:</strong> {datos.docente}</p>
                  <textarea
                    className="form-control"
                    placeholder="Descripción ante novedad"
                    rows="3"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </div>
              )}
            </fieldset>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={generarPDF}
                disabled={!mostrar}
              >
                <i className="fas fa-file-download"></i> GENERAR CERTIFICADO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificadoAdmin;