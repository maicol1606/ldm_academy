import React, { useState } from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CertificadoAdmin = () => {
  const [certificacion, setCertificacion] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [mostrarEstudiante, setMostrarEstudiante] = useState(false);

  const datosCampaña = {
    nombre: "Comedor",
    estudiantes: 5,
    fechaCreacion: "10 de marzo de 2024",
    docente: "Carlos Pérez",
  };

  const datosEstudiante = {
    nombre: "Joel",
    horasCumplidas: 120,
    faltas: 5,
    promedioHoras: 4,
    inicioServicio: "15 de enero de 2024",
    finServicio: "15 de junio de 2024",
  };

  const handleCertificacionChange = (e) => {
    setCertificacion(e.target.value);
    if (e.target.value.length === 6) {
      setMostrarDatos(true);
    } else {
      setMostrarDatos(false);
    }
  };

  const handleAsistenciaChange = (e) => {
    setAsistencia(e.target.value);
    if (e.target.value.length === 6) {
      setMostrarEstudiante(true);
    } else {
      setMostrarEstudiante(false);
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Certificación de Servicio Social", 50, 20);
    doc.setFontSize(12);
    doc.text(`Nombre del Estudiante: ${datosEstudiante.nombre}`, 20, 40);
    doc.text(`Horas Cumplidas: ${datosEstudiante.horasCumplidas}`, 20, 50);
    doc.text(`Faltas: ${datosEstudiante.faltas}`, 20, 60);
    doc.text(`Promedio de Horas: ${datosEstudiante.promedioHoras}`, 20, 70);
    doc.text(`Inicio del Servicio: ${datosEstudiante.inicioServicio}`, 20, 80);
    doc.text(`Fin del Servicio: ${datosEstudiante.finServicio}`, 20, 90);
    doc.save("certificado.pdf");
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
                <i className="far fa-file-alt"></i> &nbsp; Datos de Certificación
              </legend>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID único de certificación"
                  maxLength="6"
                  value={certificacion}
                  onChange={handleCertificacionChange}
                />
              </div>
              {mostrarDatos && (
                <div className="border p-3 rounded bg-white">
                  <p><strong>Campaña:</strong> {datosCampaña.nombre}</p>
                  <p><strong>Estudiantes inscritos:</strong> {datosCampaña.estudiantes}</p>
                  <p><strong>Fecha de creación:</strong> {datosCampaña.fechaCreacion}</p>
                  <p><strong>Docente a cargo:</strong> {datosCampaña.docente}</p>
                </div>
              )}
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID único de asistencia"
                  maxLength="6"
                  value={asistencia}
                  onChange={handleAsistenciaChange}
                />
              </div>
              {mostrarEstudiante && (
                <div className="border p-3 rounded bg-white">
                  <p><strong>Nombre del Estudiante:</strong> {datosEstudiante.nombre}</p>
                  <p><strong>Horas cumplidas:</strong> {datosEstudiante.horasCumplidas}</p>
                  <p><strong>Faltas:</strong> {datosEstudiante.faltas}</p>
                  <p><strong>Promedio de horas por día:</strong> {datosEstudiante.promedioHoras}</p>
                  <p><strong>Fecha de inicio:</strong> {datosEstudiante.inicioServicio}</p>
                  <p><strong>Fecha de fin:</strong> {datosEstudiante.finServicio}</p>
                  <textarea className="form-control" placeholder="Descripción ante novedad" rows="3"></textarea>
                </div>
              )}
            </fieldset>
            <div className="text-center mt-4">
              <button type="button" className="btn btn-primary mx-2" onClick={generarPDF}>
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
