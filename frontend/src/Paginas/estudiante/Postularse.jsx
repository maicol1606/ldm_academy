import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importamos los componentes de React-Bootstrap

const Postularse = () => {
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal
  const [selectedCampaign, setSelectedCampaign] = useState(null); // Estado para almacenar la campaña seleccionada para el modal

  // Datos de las campañas (puedes modificar estos datos según tus necesidades)
  const campaigns = [
    { id: 1, name: 'Campaña de Ayuda Social', image: 'image1.jpg', description: 'Descripción de la campaña de ayuda social' },
    { id: 2, name: 'Campaña de Reciclaje', image: 'image2.jpg', description: 'Descripción de la campaña de reciclaje' },
    { id: 3, name: 'Campaña de Educación', image: 'image3.jpg', description: 'Descripción de la campaña de educación' },
    { id: 4, name: 'Campaña de Limpieza', image: 'image4.jpg', description: 'Descripción de la campaña de limpieza' },
    { id: 5, name: 'Campaña de Donación', image: 'image5.jpg', description: 'Descripción de la campaña de donación' },
    { id: 6, name: 'Campaña de Salud', image: 'image6.jpg', description: 'Descripción de la campaña de salud' },
  ];

  const handlePostularse = (campaignName) => {
    alert(`¡Te has postulado a ${campaignName}!`);
  };

  const handleShowModal = (campaign) => {
    setSelectedCampaign(campaign); // Guardamos la campaña seleccionada
    setShowModal(true); // Mostramos el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerramos el modal
    setSelectedCampaign(null); // Limpiamos la campaña seleccionada
  };

  return (
    <div className="d-flex">
      {/* Menú lateral */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
        <h4 className="mb-4">Menú</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a href="#perfil" className="nav-link active">Ver Perfil</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#horas" className="nav-link">Ver Horas</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#campañas" className="nav-link">Campañas</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#certificados" className="nav-link">Certificados</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#postularse" className="nav-link">Postúlate</a>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="container" style={{ marginLeft: '260px' }}>
        <section id="postularse" className="mt-5">
          <h2 className="text-center mb-4">Postúlate a una Campaña</h2>
          <div className="row">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={campaign.image}
                    alt={campaign.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{campaign.name}</h5>
                    <Button variant="primary" onClick={() => handlePostularse(campaign.name)}>
                      Postúlate
                    </Button>
                    <Button variant="info" className="ml-2" onClick={() => handleShowModal(campaign)}>
                      Más Información
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal de información */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCampaign?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedCampaign?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Postularse;
