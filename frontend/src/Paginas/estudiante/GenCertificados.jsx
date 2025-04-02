import React, { useState } from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
import { FaIdCard, FaClock, FaEnvelope, FaFileSignature, FaUser, FaChalkboardTeacher, FaSignature, FaFilePdf } from 'react-icons/fa';
import { IoDocumentTextSharp } from 'react-icons/io5';

const GenCertificados = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [idAsistencia, setIdAsistencia] = useState('');
  const [correo, setCorreo] = useState('');
  const [firma, setFirma] = useState(null);

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
            onMouseOut={(e) => e.target.style.backgroundColor = '#004a99'}>
            Genera tu certificado
          </button>
        </div>
      </div>

      {/* Segunda sección */}
      <div className="container text-center my-5">
        <h2 style={{ fontWeight: 'bold', color: '#002855' }}>Ventajas de certificarte en servicio social</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <IoDocumentTextSharp size={50} color="#d4af37" />
            <h4 className="mt-3">Poder graduarte</h4>
            <p>Podrás graduarte de 11°, ya que el certificado es obligatorio para finalizar el colegio.</p>
          </div>
          <div className="col-md-4">
            <FaClock size={50} color="#d4af37" />
            <h4 className="mt-3">Es obligatorio</h4>
            <p>Debes completar 120 horas de servicio social, requisito fundamental para tu graduación.</p>
          </div>
          <div className="col-md-4">
            <FaIdCard size={50} color="#d4af37" />
            <h4 className="mt-3">Beneficio educativo</h4>
            <p>El certificado puede ser útil para becas y oportunidades académicas futuras.</p>
          </div>
        </div>
      </div>

      {/* Tercera sección */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
        <div className="container">
          <h2 className="text-center mb-4">Crea tu certificado en línea</h2>
          <p className="text-center">Sigue estos pasos para generar tu certificado de servicio social fácilmente.</p>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 text-center">
                  <FaIdCard size={50} color="#d4af37" />
                  <h4 className="mt-2">Paso 1: Número de identificación</h4>
                  <p>Ingresa tu número de identificación para recuperar tu información.</p>
                </div>
                <div className="col-md-6 text-center">
                  <FaClock size={50} color="#d4af37" />
                  <h4 className="mt-2">Paso 2: ID y asistencia</h4>
                  <p>Consulta tu ID y asistencia para verificar las horas completadas.</p>
                </div>
                <div className="col-md-6 text-center mt-4">
                  <FaEnvelope size={50} color="#d4af37" />
                  <h4 className="mt-2">Paso 3: Correo electrónico</h4>
                  <p>Confirma el correo al que se enviará el certificado.</p>
                </div>
                <div className="col-md-6 text-center mt-4">
                  <FaFileSignature size={50} color="#d4af37" />
                  <h4 className="mt-2">Paso 4: Subir firma</h4>
                  <p>Adjunta tu firma digital para completar el proceso.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <IoDocumentTextSharp size={150} color="#d4af37" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de generación de certificado*/}
      <div className="container py-5" style={{ backgroundColor: 'white', textAlign: 'center' }}>
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

        <button className="btn btn-primary mt-4" style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
          <FaFilePdf /> Generar certificado
        </button>
      </div>
    </div>
  );
};

export default GenCertificados;
