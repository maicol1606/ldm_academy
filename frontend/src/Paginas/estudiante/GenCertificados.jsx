import React, { useState } from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
import { FaIdCard, FaClock, FaEnvelope, FaFileSignature, FaUser, FaChalkboardTeacher, FaSignature, FaFilePdf } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const GenCertificados = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [idAsistencia, setIdAsistencia] = useState('');
  const [correo, setCorreo] = useState('');
  const [firma, setFirma] = useState(null);
  const [generado, setGenerado] = useState(false); // Estado para mostrar el certificado generado

  const generarCertificado = () => {
    // Aquí simulas la generación del certificado
    if (identificacion && idAsistencia && correo && firma) {
      setGenerado(true);
    } else {
      alert('Por favor, complete todos los campos antes de generar el certificado.');
    }
  };

  const descargarCertificado = () => {
    const doc = new jsPDF();

    // Contenido del certificado
    doc.setFontSize(16);
    doc.text('Certificado de Servicio Social', 20, 20);
    doc.setFontSize(12);
    doc.text(`Este certificado acredita que el estudiante ${identificacion} ha completado satisfactoriamente 120 horas de servicio social en la institución educativa.`, 20, 30);
    doc.text('Se ha validado su presencia y participación en las siguientes actividades:', 20, 40);
    doc.text('• Comedor', 20, 50);
    doc.text('• Biblioteca', 20, 60);
    doc.text('• Enfermería', 20, 70);
    doc.text('• Coordinación', 20, 80);
    doc.text('• Orientación', 20, 90);
    doc.text('¡Felicidades por completar tu servicio social y continuar con tu formación!', 20, 100);

    // Guardar como PDF
    doc.save('certificado_servicio_social.pdf');
  };

  return (
    <div className="d-flex flex-column">
      <NavegacionEstudiante />

      {/* Primera sección */}
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{
        backgroundColor: '#002855',
        height: '70vh',
        width: '100%',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Listo para generar tu certificado en línea</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>
            Ya puedes generar tu certificado de manera online, sin tener que esperar en largas filas.
          </p>
          <button style={{
            backgroundColor: '#004a99',
            border: '2px solid #003366',
            color: 'white',
            padding: '15px 30px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            marginTop: '20px',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#005bbb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#004a99'}
            onClick={generarCertificado}>
            Genera tu certificado
          </button>
        </div>
      </div>

      {/* Generación del Certificado */}
      {generado ? (
        <div className="container py-5" style={{ backgroundColor: 'white', textAlign: 'center', border: '2px solid #004a99', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 className="mb-4" style={{ color: '#002855', fontWeight: 'bold' }}>¡Certificado Generado Exitosamente!</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card" style={{ padding: '30px', backgroundColor: '#f8f8f8', border: '1px solid #d4af37', borderRadius: '8px' }}>
                <h3 className="text-center" style={{ color: '#003366', fontWeight: 'bold' }}>Certificado de Servicio Social</h3>
                <p className="mt-3" style={{ fontSize: '1.2rem', color: '#333' }}>
                  Este certificado acredita que el estudiante <strong>{identificacion}</strong> ha completado satisfactoriamente <strong>120 horas</strong> de servicio social en la institución educativa.
                </p>
                <p style={{ fontSize: '1.1rem', color: '#333' }}>
                  Se ha validado su presencia y participación en las siguientes actividades:
                </p>
                <ul style={{ textAlign: 'left', listStyleType: 'disc', paddingLeft: '30px', fontSize: '1.1rem', color: '#333' }}>
                  <li>Comedor</li>
                  <li>Biblioteca</li>
                  <li>Enfermería</li>
                  <li>Coordinación</li>
                  <li>Orientación</li>
                </ul>
                <p className="mt-3" style={{ fontSize: '1.2rem', color: '#333' }}>
                  ¡Felicidades por completar tu servicio social y continuar con tu formación!
                </p>
                <div className="text-center mt-4">
                  <button className="btn btn-success" style={{ fontSize: '1.2rem', padding: '10px 20px' }} onClick={descargarCertificado}>
                    <FaFilePdf /> Descargar Certificado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-5" style={{ backgroundColor: 'white', textAlign: 'center', padding: '30px' }}>
          <h2 className="mb-4">Genera tu certificado ahora</h2>
          <p>Si ya completaste tus 120 horas, podrás generar tu certificado en PDF y recibirlo en tu correo.</p>

          <div className="row justify-content-center">
            <div className="col-md-6 text-start">
              <label className="form-label"><FaUser /> Número de identificación</label>
              <input type="text" className="form-control" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
            </div>
            <div className="col-md-6 text-start">
              <label className="form-label"><FaUser /> ID de asistencia</label>
              <input type="text" className="form-control" value={idAsistencia} onChange={(e) => setIdAsistencia(e.target.value)} />
            </div>
          </div>

          <div className="row justify-content-center mt-3">
            <div className="col-md-6 text-start">
              <label className="form-label"><FaEnvelope /> Correo electrónico</label>
              <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="col-md-6 text-start">
              <label className="form-label"><FaSignature /> Subir firma</label>
              <input type="file" className="form-control" onChange={(e) => setFirma(e.target.files[0])} />
            </div>
          </div>

          <button className="btn btn-primary mt-4" style={{ fontSize: '1.2rem', padding: '10px 20px' }} onClick={generarCertificado}>
            <FaFilePdf /> Generar certificado
          </button>
        </div>
      )}
    </div>
  );
};

export default GenCertificados;
