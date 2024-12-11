import React from 'react';

import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';

const GenCertificados = () => {
  const GenCertificados = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      numIdentificacion: '1234567890',
      telefono: '321-654-9870',
      campaña: 'Campaña de Ayuda Social',
      horas: 40, // Horas realizadas
      correo: 'juan.perez@email.com',
    },
    {
      id: 2,
      nombre: 'Ana Gómez',
      numIdentificacion: '9876543210',
      telefono: '312-345-6789',
      campaña: 'Campaña de Reciclaje',
      horas: 35,
      correo: 'ana.gomez@email.com',
    },
    {
      id: 3,
      nombre: 'Carlos López',
      numIdentificacion: '1112233445',
      telefono: '310-456-7890',
      campaña: 'Campaña de Educación',
      horas: 50,
      correo: 'carlos.lopez@email.com',
    },
    {
      id: 4,
      nombre: 'Laura Fernández',
      numIdentificacion: '5556677889',
      telefono: '300-567-8901',
      campaña: 'Campaña de Limpieza',
      horas: 60,
      correo: 'laura.fernandez@email.com',
    },
    {
      id: 5,
      nombre: 'Miguel Rodríguez',
      numIdentificacion: '7778889990',
      telefono: '311-678-9012',
      campaña: 'Campaña de Donación',
      horas: 45,
      correo: 'miguel.rodriguez@email.com',
    },
    {
      id: 6,
      nombre: 'Elena Martínez',
      numIdentificacion: '2223334445',
      telefono: '305-123-4567',
      campaña: 'Campaña de Salud',
      horas: 38,
      correo: 'elena.martinez@email.com',
    },
  ];

  // Función para generar el certificado y simular el envío por correo
  const handleGenerarCertificado = (correo, nombre) => {
    alert(`El certificado de ${nombre} ha sido generado y enviado a ${correo}`);
  };

  return (
    
    <div className="d-flex">
      <NavegacionEstudiante />

      {/* Contenido principal */}
      <div className="container" style={{ marginLeft: '260px' }}>
        <section id="certificados" className="mt-5">
          <h2 className="text-center mb-4">Certificados de Servicio Social</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Número de Identificación</th>
                <th>Número de Teléfono</th>
                <th>Campaña Realizada</th>
                <th>Horas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {certificados.map((certificado) => (
                <tr key={certificado.id}>
                  <td>{certificado.nombre}</td>
                  <td>{certificado.numIdentificacion}</td>
                  <td>{certificado.telefono}</td>
                  <td>{certificado.campaña}</td>
                  <td>{certificado.horas} horas</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleGenerarCertificado(certificado.correo, certificado.nombre)}
                    >
                      Generar Certificado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default GenCertificados;
