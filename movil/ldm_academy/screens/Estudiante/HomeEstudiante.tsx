import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Campaña {
  nombre: string;
  descripcion: string;
  necesarias: number;
  postuladas: number;
}

export default function HomeEstudiante() {
  const [campañas, setCampañas] = useState<Campaña[]>([]);
  const [docentes, setDocentes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campanasRes, docentesRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/campanas/mostrarCampanas`),
          axios.get(`http://localhost:3000/api/docentes/obtenerDocentes`)
        ]);
        setCampañas(campanasRes.data);
        setDocentes(docentesRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex home-estudiante">
      <div className="container" style={{ marginLeft: '260px' }}>
        <section id="perfil" className="text-center mt-5">
          <div
            className="service-social-header bg-image"
            style={{ backgroundImage: 'url(ruta-de-tu-imagen)' }}
          >
            <div className="overlay text-white">
              <h1>Servicio Social</h1>
              <button className="btn btn-primary btn-lg mt-2">Hacer Servicio Social</button>
            </div>
          </div>
        </section>

        <section className="mt-4 text-center">
          <button className="btn btn-info" onClick={handleModal}>
            Ver cuántas personas se encuentran realizando servicio social
          </button>
        </section>

        {showModal && (
          <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Personas realizando servicio social</h5>
                  <button type="button" className="close" onClick={handleModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Campaña</th>
                        <th>Realizando Servicio</th>
                        <th>Postulados</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        <section id="campañas" className="mt-5">
          <h2 className="mb-4">Campañas disponibles</h2>
          <div className="row">
            {campañas.map((campaña, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={ruta-imagen-${campaña.nombre.toLowerCase()}}
                    alt={Imagen de la campaña ${campaña.nombre}}
                    className="card-img-top"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{campaña.nombre}</h5>
                    <p className="card-text">{campaña.descripcion}</p>
                    <hr />
                    <p><strong>Necesarias:</strong> {campaña.necesarias}</p>
                    <p><strong>Postuladas:</strong> {campaña.postuladas}</p>
                    <button className="btn btn-success mt-auto">Postularse</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}