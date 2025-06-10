import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
const Postularse = () => {
  const [showModal, setShowModal] = useState(false); 
  const [selectedCampaign, setSelectedCampaign] = useState(null); 
  // Datos de las campañas
  const campaigns = [
    { id: 1, name: 'Campaña orientación', image: 'image1.jpg', description: 'permite a los estudiantes apoyar a sus compañeros en su desarrollo emocional y académico. Fomenta la empatía, la escucha activa y el trabajo en equipo, ayudando a crear un ambiente escolar' },
    { id: 2, name: 'Campaña coordinación', image: 'image2.jpg', description: 'brinda a los estudiantes la oportunidad de apoyar en la organización de actividades y eventos educativos. Fomenta el trabajo en equipo, la responsabilidad y el liderazgo, contribuyendo a la mejora de la convivencia y el desarrollo' },
    { id: 3, name: 'Campaña salón', image: 'image3.jpg', description: 'brinda a los estudiantes la oportunidad de apoyar a sus compañeros en su aprendizaje y desarrollo. Fomenta la colaboración, la responsabilidad y el trabajo en equipo, contribuyendo a un ambiente educativo más inclusivo y participativo' },
    { id: 4, name: 'Campaña Biblioteca', image: 'image4.jpg', description: 'permite a los estudiantes ayudar en la organización y gestión de recursos, promoviendo el acceso a la lectura y el aprendizaje. Fomenta la responsabilidad, el orden y el trabajo en equipo, contribuyendo al desarrollo intelectual de la comunidad escolar' },
    { id: 5, name: 'Campaña comedor', image: 'image5.jpg', description: 'fomenta la solidaridad y responsabilidad entre los estudiantes. Ayuda a organizar y distribuir alimentos, promoviendo el trabajo en equipo y el apoyo a la comunidad escolar, mientras se desarrollan habilidades de liderazgo y empatía' },
    { id: 6, name: 'Campaña enfermeria', image: 'image6.jpg', description: 'permite a los estudiantes poner en práctica sus conocimientos y habilidades en un entorno real, mientras ayuda a cuidar y apoyar a los pacientes. Fomenta la empatía, la responsabilidad y el trabajo en equipo, contribuyendo al bienestar de la comunidad' },
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
      {/* Contenido principal */}
      <div className="container">
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
