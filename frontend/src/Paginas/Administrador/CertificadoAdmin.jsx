import React, { useState } from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionAdmin';
import { FaIdCard, FaClock, FaEnvelope, FaFileSignature, FaUser, FaChalkboardTeacher, FaSignature, FaFilePdf } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import NavegacionAdmin from '../../Componentes/NavegacionAdmin';

const GenCertificados = () => {
  const [identificacion, setIdentificacion] = useState('');

  const [generado, setGenerado] = useState(false); // Estado para mostrar el certificado generado

  const generarCertificado = () => {
    // Aquí simulas la generación del certificado
    if (identificacion) {
      setGenerado(true);
    } else {
      alert('Por favor, complete todos los campos antes de generar el certificado.');
    }
  };

  const descargarCertificado = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    let currentHeight = 20;

    // Título principal
    doc.setFontSize(20);
    doc.setTextColor(0, 40, 85); // color #002855
    doc.setFont('helvetica', 'bold');
    doc.text('¡Certificado Generado Exitosamente!', marginLeft, currentHeight);

    currentHeight += 20;

    // Subtítulo
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102); // color #003366
    doc.text('Certificado de Servicio Social', marginLeft, currentHeight);

    currentHeight += 20;

    // Cuerpo del certificado
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51); // color #333
    doc.setFont('helvetica', 'normal');

    const texto1 = `Este certificado acredita que el estudiante identificado con documento N° ${identificacion} ha completado satisfactoriamente SU SERVICIO SOCIAL en la institución educativa Fernando Gonzalez Ochoa.`;
    const texto2 = `Se ha validado su presencia y participación de manera correcta, es por eso que este certificado es entregado a usted:`;
    const texto3 = `• Cumplimiento en su servicio social`;
    const texto4 = `¡Felicidades por completar tu servicio social y continuar con tu formación!`;

    const splitText1 = doc.splitTextToSize(texto1, 170);
    const splitText2 = doc.splitTextToSize(texto2, 170);
    const splitText3 = doc.splitTextToSize(texto3, 170);
    const splitText4 = doc.splitTextToSize(texto4, 170);

    doc.text(splitText1, marginLeft, currentHeight);
    currentHeight += splitText1.length * 10;

    doc.text(splitText2, marginLeft, currentHeight);
    currentHeight += splitText2.length * 10;

    doc.text(splitText3, marginLeft + 10, currentHeight); // sangría para la lista
    currentHeight += splitText3.length * 10;

    doc.text(splitText4, marginLeft, currentHeight);

    // Guardar el PDF
    doc.save('certificado_servicio_social.pdf');
  };


  return (
    <div className="d-flex flex-column">
      <NavegacionAdmin />

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
                  Este certificado acredita que el estudiante identificado con documento N° <strong>{identificacion}</strong> ha completado satisfactoriamente <strong>SU SERVICIO SOCIAL</strong> en la institución educativa Fernando Gonzalez Ochoa.
                </p>
                <p style={{ fontSize: '1.1rem', color: '#333' }}>
                  Se ha validado su presencia y participación de manera correcta es por eson este certificado es entregado a usted:
                </p>
                <ul style={{ textAlign: 'left', listStyleType: 'disc', paddingLeft: '30px', fontSize: '1.1rem', color: '#333' }}>
                  <li>Cumplimiento en su servicio social</li>
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
            <p>Si en caso de que un estudiante no pueda generar su certficado se le podra generar desde aa con el numero de identificación.</p>

          <div className="row justify-content-center">
            <div className="col-md-6 text-start">
              <label className="form-label"><FaUser /> Número de identificación del estudiante</label>
              <input type="text" className="form-control" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
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
