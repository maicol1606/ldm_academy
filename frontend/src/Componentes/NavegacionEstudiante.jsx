import React, { useState, useEffect } from 'react';
import cerrarSesion from '../hooks/cerrarSesion'; // Asegúrate de que esta función esté bien exportada
import axios from 'axios'; // Usaremos Axios para hacer las peticiones al backend

export default function NavegacionEstudiante() {
  const [hover, setHover] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState('/img/navegacion/Avatar2.png');
  const [studentData, setStudentData] = useState({
    nombre: '',
    campaña: '',
    horas: '',
    telefono: '',
    correo: ''
  });

  const CerrarSesion = cerrarSesion();

  // Función para obtener los datos del perfil desde el backend
  const getProfileData = async () => {
    try {
      const response = await axios.get('/api/estudiantes/profile'); // Cambia esta URL a la de tu API
      setStudentData(response.data);
      setProfileImage(response.data.profileImage || '/img/navegacion/Avatar2.png');
    } catch (error) {
      console.error('Error obteniendo los datos del perfil:', error);
    }
  };

  // Función para guardar los cambios en el perfil
  const saveProfileChanges = async () => {
    try {
      const updatedData = {
        nombre: studentData.nombre,
        campaña: studentData.campaña,
        telefono: studentData.telefono,
        correo: studentData.correo,
        profileImage: profileImage // Si la imagen cambia, la enviamos al backend
      };
      const response = await axios.put('/api/estudiantes/profile', updatedData); // Cambia esta URL a la de tu API
      alert('Perfil actualizado con éxito');
      setShowEditModal(false); // Cerrar el modal después de guardar
    } catch (error) {
      console.error('Error guardando los cambios:', error);
      alert('Hubo un error al actualizar el perfil.');
    }
  };

  const handleMouseEnter = (icon) => setHover(icon);
  const handleMouseLeave = () => setHover(null);
  const handleProfileClick = () => {
    setShowProfileModal(true);
    getProfileData();  // Obtener los datos cuando se abre el modal
  };
  const handleEditClick = () => {
    setShowProfileModal(false);
    setShowEditModal(true);
  };
  const closeModal = () => {
    setShowProfileModal(false);
    setShowEditModal(false);
  };

  const handleImageDelete = () => setProfileImage(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Menú de navegación */}
      <div
        className="bg-dark text-white"
        style={{
          width: '80px',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '20px',
        }}
      >
        {/* Foto de perfil */}
        <img
          src={profileImage || '/img/navegacion/Avatar2.png'}
          className="rounded-circle img-fluid mb-3"
          alt="Perfil"
          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
          onClick={handleProfileClick}  // Esta línea es crucial para abrir el modal
        />

        {/* Íconos de navegación */}
        <ul className="list-unstyled d-flex flex-column align-items-center">
          {[ 
            { icon: 'bi-clock', text: 'Ver horas', link: '/horas' },
            { icon: 'bi-info-circle', text: 'Información de la campaña', link: '/HomeEstudiante' },
            { icon: 'bi-list-task', text: 'Lista de campañas', link: '/ListCampañas' },
            { icon: 'bi-bell', text: 'Notificaciones', link: '/Notificaciones' },
            { icon: 'bi-clipboard2-check', text: 'Certificados', link: '/GenCertificados' },
            { icon: 'bi-box-arrow-right', text: 'Cerrar sesión', link: '/' },
          ].map((item, index) => (
            <li
              key={index}
              className="mb-4 position-relative"
              onMouseEnter={() => handleMouseEnter(item.text)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (item.text === 'Cerrar sesión') {
                  CerrarSesion();
                  return;
                }
                window.location.href = item.link;
              }}
            >
              <div className="icon-container position-relative">
                <i className={`bi ${item.icon} text-white`} style={{ fontSize: '28px' }}></i>
                {hover === item.text && (
                  <span
                    className="position-absolute top-50 start-100 translate-middle-y ms-2 bg-dark text-white rounded-3 px-2 py-1"
                    style={{ whiteSpace: 'nowrap', zIndex: 10 }}
                  >
                    {item.text}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* MODAL: Ver Perfil */}
      {showProfileModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content shadow rounded-4">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title">Perfil del Estudiante</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={profileImage || '/img/navegacion/Avatar2.png'}
                  alt="Perfil"
                  className="rounded-circle mb-3"
                  style={{ width: '100px', height: '100px' }}
                />
                <p><strong>Nombre:</strong> {studentData.nombre}</p>
                <p><strong>Campaña:</strong> {studentData.campaña}</p>
                <p><strong>Horas revisadas:</strong> {studentData.horas}</p>
                <p><strong>Teléfono:</strong> {studentData.telefono}</p>
                <p><strong>Correo electrónico:</strong> {studentData.correo}</p>
              </div>
              <div className="modal-footer border-top-0 justify-content-center">
                <button className="btn btn-outline-primary" onClick={handleEditClick}>Editar perfil</button>
                <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Editar Perfil */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content shadow rounded-4">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title">Editar Perfil</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-3">
                  <img
                    src={profileImage || '/img/navegacion/Avatar2.png'}
                    alt="Perfil"
                    className="rounded-circle mb-2"
                    style={{ width: '80px', height: '80px' }}
                  />
                  <div>
                    <button className="btn btn-outline-danger btn-sm me-2" onClick={handleImageDelete}>
                      <i className="bi bi-trash"></i>
                    </button>
                    <label className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-upload"></i>
                      <input type="file" hidden onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
                <div className="mb-2">
                  <label>Nombre</label>
                  <input type="text" className="form-control" value={studentData.nombre} disabled />
                </div>
                <div className="mb-2">
                  <label>Campaña</label>
                  <input type="text" className="form-control" value={studentData.campaña} disabled />
                </div>
                <div className="mb-2">
                  <label>Horas</label>
                  <input type="number" className="form-control" value={studentData.horas} disabled />
                </div>
                <div className="mb-2">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentData.telefono}
                    onChange={(e) => setStudentData({ ...studentData, telefono: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={studentData.correo}
                    onChange={(e) => setStudentData({ ...studentData, correo: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer border-top-0 justify-content-center">
                <button className="btn btn-success" onClick={saveProfileChanges}>Guardar Cambios</button>
                <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
