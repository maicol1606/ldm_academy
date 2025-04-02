import React, { useState } from 'react';
import cerrarSesion from '../hooks/cerrarSesion.JS';

export default function NavegacionEstudiante() {
    const [hover, setHover] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [profileImage, setProfileImage] = useState('/img/navegacion/Avatar2.png');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCampaign, setSelectedCampaign] = useState('');

    const CerrarSesion = cerrarSesion();

    const handleMouseEnter = (icon) => setHover(icon);
    const handleMouseLeave = () => setHover(null);

    const handleProfileClick = () => {
        setShowProfileModal(true); // ver perfil
    };

    const handleEditClick = () => {
        setShowEditModal(true); // editar perfil
    };

    const closeModal = () => {
        setShowProfileModal(false);
        setShowEditModal(false);
    };

    const handleImageDelete = () => {
        setProfileImage(null); // Elimina la foto de perfil
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCampaignChange = (event) => {
        setSelectedCampaign(event.target.value);
    };

    return (

        <div className="d-flex">
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
                    paddingBottom: '20px',
                }}
            >
                {/* Imagen de perfil */}
                <img
                    src={profileImage || '/img/navegacion/Avatar2.png'}
                    className="rounded-circle img-fluid mb-3"
                    alt="Foto de perfil"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                    onClick={handleProfileClick}
                />

                {/* Menú de íconos */}
                <ul className="list-unstyled w-100 d-flex flex-column align-items-center">
                    {[
                        { icon: 'bi-clock', text: 'Ver horas', link: '/horas' },
                        { icon: 'bi-info-circle', text: 'Información de la campaña', link: '/HomeEstudiante' },
                        { icon: 'bi-list-task', text: 'Lista de campañas', link: '/ListCampañas' },
                        { icon: 'bi-bell', text: 'Notificaciones', link: '/Notificaciones' },
                        { icon: 'bi-clipboard2-check', text: 'Certificados', link: '/GenCertificados' },
                        { icon: 'bi-box-arrow-right', text: 'Cerrar sesion', link: '/' },
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="mb-4 position-relative"
                            onMouseEnter={() => handleMouseEnter(item.text)}
                            onMouseLeave={handleMouseLeave}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                if (item.text === 'Cerrar sesion') {
                                    CerrarSesion();
                                    return;
                                }
                                window.location.href = item.link;
                            }}
                        >
                            <div className="icon-container position-relative">
                                <i className={`bi ${item.icon} text-white`} style={{ fontSize: '30px' }}></i>
                                {hover === item.text && (
                                    <span
                                        className="position-absolute top-50 start-100 translate-middle ms-2 bg-dark text-white rounded-3 px-2 py-1"
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

            {/*ver perfil */}
            {showProfileModal && (

                <div
                    className="modal show"
                    tabIndex="-1"
                    style={{

                        overflow: 'auto',
                        display: 'block',
                        position: 'center',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndexIndex: 1050,
                        width: '600px', // Modal más ancho
                        height: 'auto',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <div className="text-center">
                        {/* Foto de perfil */}
                        <img
                            src={profileImage || '/img/navegacion/Avatar2.png'}
                            className="rounded-circle mb-3"
                            alt="Foto de perfil"
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                    <h4>Perfil del Estudiante</h4>
                    <p><strong>Nombre:</strong> Juan Pérez</p>
                    <p><strong>Campaña:</strong> Desarrollo de Software</p>
                    <p><strong>Horas revisadas:</strong> 30</p>
                    <p><strong>Teléfono:</strong> 300-123-4567</p>
                    <p><strong>Correo electrónico:</strong> juan.perez@email.com</p>
                    <button className="btn btn-primary" onClick={handleEditClick}>
                        Editar perfil
                    </button>
                    <p></p>
                    <button className="btn btn-secondary" align-Items="center" onClick={closeModal}>
                        Cerrar
                    </button>
                </div>
            )
            }

            {/*editar perfil */}
            {
                showEditModal && (
                    <div
                        className="modal show"
                        tabIndex="-1"
                        style={{
                            display: 'block',
                            position: 'center',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1050,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            width: '600px', // Modal más ancho
                            height: 'auto',
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <div className="text-center">
                            {/* Foto de perfil */}
                            <img
                                src={profileImage || '/img/navegacion/Avatar2.png'}
                                className="rounded-circle mb-3"
                                alt="Foto de perfil"
                                style={{ width: '100px', height: '100px' }}
                            />
                            {/* Íconos para cambiar y eliminar foto */}
                            <div>
                                <button className="btn btn-light me-2" onClick={handleImageDelete}>
                                    <i className="bi bi-trash text-danger"></i> Eliminar foto
                                </button>
                                <button className="btn btn-light">
                                    <i className="bi bi-upload text-primary"></i>
                                    <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
                                    Subir foto
                                </button>
                            </div>
                        </div>
                        <h4>Editar Perfil</h4>
                        <label>Nombre</label>
                        <input type="text" className="form-control mb-2" defaultValue="Juan Pérez" disabled />
                        <label>Campaña</label>
                        <select
                            className="form-control mb-2"
                            value={selectedCampaign}
                            onChange={handleCampaignChange}
                        >
                            <option value="">Selecciona una campaña</option>
                            <option value="Coordinación">Coordinación</option>
                            <option value="Orientación">Orientación</option>
                            <option value="Comedor">Comedor</option>
                            <option value="Salón">Salón</option>
                            <option value="Enfermería">Enfermería</option>
                            <option value="Biblioteca">Biblioteca</option>
                        </select>
                        <label>Horas</label>
                        <input type="number" className="form-control mb-2" defaultValue="30" disabled />
                        <label>Teléfono</label>
                        <input type="text" className="form-control mb-2" defaultValue="300-123-4567" />
                        <label>Correo electrónico</label>
                        <input type="email" className="form-control mb-2" defaultValue="juan.perez@email.com" />
                        <button className="btn btn-primary" onClick={closeModal}>
                            Guardar cambios
                        </button>
                        <button className="btn btn-secondary" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                )
            }
        </div >
    );
}
