import React, { useState } from 'react';

const Banner = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePostulateClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section id="banner" className="d-flex flex-column align-items-center text-center ">
      <div className="d-flex align-items-start justify-content-between w-100" style={{ maxWidth: '1200px' }}>
        <div className="content text-start" style={{ flex: 1, marginRight: '20px' }}>
          <header>
            <h1 className="display-5 fw-bold mb-3" style={{ textAlign: 'left', marginLeft: '-20px', color: 'black' }}>
              ¿Listo para iniciar tu servicio social?
            </h1>
            <p className="lead text-black">¡Todo estudiante debe hacerlo!</p>
          </header>
          <p className="text-black">
            El servicio social constituye una actividad que permite al estudiante en formación
            retribuir a la sociedad, contribuyendo con propuestas de solución y aplicación de
            conocimientos integrales hacia los sectores más desfavorecidos.
          </p>
          <ul className="actions list-unstyled">
            <li className="mt-3">
              <button
                onClick={handlePostulateClick}
                className="btn border-color-black text-black rounded-3"
                style={{ backgroundColor: '#f8f9fa', padding: '10px 50px', fontSize: '1rem' }}
              
              >
                Ver
              </button>
            </li>
          </ul>
        </div>
        <div className="map-container" style={{ flex: 1 }}>
          <div className="text-center mb-3">
            <h5 className="" style={{ fontSize: '1.1rem', color: 'black' }}>
              ¡Aquí queda!
            </h5>
          </div>
          <iframe
            title="Ubicación del Colegio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.5058366807784!2d-74.1100757243239!3d4.502416343343151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3fa3ceaf844281%3A0x708e194f0a93e51a!2sCOLEGIO%20FERNANDO%20GONZALEZ%20OCHOA%20(IED)!5e0!3m2!1ses!2sco!4v1733783150546!5m2!1ses!2sco"
            className="w-100 rounded shadow-lg"
            style={{ border: 0, height: '350px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-3">¿Por qué postularse?</h3>
            <p className="text-muted text-center">
              Completar las <strong>120 horas</strong> de servicio social es obligatorio y te brinda la
              oportunidad de contribuir al bienestar de tu comunidad mientras desarrollas habilidades
              clave para tu formación.
            </p>
            <div className="text-center ">
              <button
                onClick={closeModal}
                className="btn border-color-black text-black rounded-3"
                style={{ backgroundColor: '#f8f9fa', padding: '10px 50px', fontSize: '1rem' }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;
