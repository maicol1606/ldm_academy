import React , { useState, useEffect } from 'react'
import cerrarSesion from '../../hooks/cerrarSesion.JS';
export default function HomeEstudiante() {

  const [campañas, setCampañas] = useState([]);
  const [docentes, setDocentes] = useState([]);

  const CerrarSesion= cerrarSesion();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campanasRes, docentesRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/campanas/mostrarCampanas`),
          axios.get(`http://localhost:3000/api/docentes/obtenerDocentes`),
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
        </ul>
        <button className="btn btn-danger" onClick={CerrarSesion}>Cerrar Sesion</button>
      </nav>

      {/* Contenido principal */}
      <div className="container" style={{ marginLeft: '260px' }}>
        <section id="perfil" className="text-center mt-5">
          <h1>Servicio Social</h1>
          <img 
            src="ruta-de-tu-imagen" 
            alt="Imagen relacionada al servicio social" 
            className="img-fluid rounded mb-3" 
            style={{ maxWidth: '300px' }} 
          />
          <p>Texto explicativo sobre el servicio social.</p>
          <p>Otro párrafo con información adicional.</p>
          <button className="btn btn-primary btn-lg">Hacer Servicio Social</button>
        </section>

        {/* Otras secciones */}
        <section id="horas" className="mt-5">
          <h2>Ver Horas</h2>
          <p>Detalles de las horas aquí...</p>
        </section>

        <section id="campañas" className="mt-5">
          <h2>Campañas disponibles</h2>
          <div className="row">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img 
                    src="ruta-de-tu-imagen" 
                    alt={`Imagen de la campaña ${index + 1}`} 
                    className="card-img-top" 
                    style={{ height: '150px', objectFit: 'cover' }} 
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Nombre de la campaña {index + 1}</h5>
                    <p className="card-text">Descripción breve sobre qué se hace en el Servicio Social.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certificados" className="mt-5">
          <h2>Certificados</h2>
          <p>Información sobre los certificados obtenidos.</p>
        </section>
      </div>
    </div>
  )
}
