import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cerrarSesion from '../hooks/cerrarSesion.js';

export default function NavegacionAdmin() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const CerrarSesion = cerrarSesion();
    const [profileData, setProfileData] = useState({
        name: 'Administrador',
        email: 'admin@gmail.com',
        role: 'Administrador',
        profilePicture: '/img/navegacion/Avatar2.png',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleProfileClick = () => setShowProfileModal(true);
    const handleCloseProfileModal = () => {
        setShowProfileModal(false);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData((prevData) => ({ ...prevData, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditProfile = () => setIsEditing(true);
    const handleSaveProfile = () => setIsEditing(false);

    return (
        <div>
            {!menuOpen && (
                <button
                    className="btn btn-primary rounded-circle shadow-sm"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasAdmin"
                    aria-controls="offcanvasAdmin"
                    style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1 }}
                >
                    <i className="bi bi-list fs-4"></i>
                </button>
            )}

<div
    className="offcanvas offcanvas-start text-white"
    tabIndex="-1"
    id="offcanvasAdmin"
    style={{ width: '280px', backgroundColor: '#000' }} // Fondo negro
    onShow={() => setMenuOpen(true)}
    onHide={() => setMenuOpen(false)}
>

                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title">Menú Administrador</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="text-center">
                        <img
                            src={profileData.profilePicture}
                            className="rounded-circle border border-light shadow-sm mb-3"
                            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                            alt="Foto de perfil"
                            onClick={handleProfileClick}
                        />
                        <p className="h6">{profileData.name}</p>
                    </div>

                    <ul className="list-unstyled mt-4">
                        <li><Link to="/" className="text-white text-decoration-none d-flex align-items-center p-2 rounded"><i className="bi bi-house-door me-2"></i> Página de Inicio</Link></li>
                        <li><Link to="/NotificaionesAdmin" className="text-white text-decoration-none d-flex align-items-center p-2 rounded"><i className="bi bi-bell me-2"></i> Notificaciones</Link></li>
                        {[{
                            title: 'Estudiantes', icon: 'bi-person', links: [{ to: '/EstudianteNew', text: 'Agregar Estudiante', icon: 'bi-person-plus' }, { to: '/EstudianteList', text: 'Lista de Estudiantes', icon: 'bi-person-lines-fill' }] },
                            { title: 'Docentes', icon: 'bi-person-badge', links: [{ to: '/DocenteNew', text: 'Agregar Docente', icon: 'bi-person-plus' }, { to: '/DocenteList', text: 'Lista de Docentes', icon: 'bi-person-lines-fill' }] },
                            { title: 'Campañas', icon: 'bi-flag', links: [{ to: '/CampaignNew', text: 'Crear Campaña', icon: 'bi-plus-circle' }, { to: '/CampaignList', text: 'Lista de Campañas', icon: 'bi-list' }] },
                            { title: 'Certificados', icon: 'bi-file-earmark-check', links: [{ to: '/CertificadoAdmin', text: 'Lista de Certificados', icon: 'bi-file-earmark' }] },
                            { title: 'Estadísticas', icon: 'bi-graph-up', links: [{ to: '/EnProceso', text: 'En proceso', icon: 'bi-clock-history' }, { to: '/Estadisticas', text: 'Finalizadas', icon: 'bi-check2-circle' }] },
                        ].map((item, index) => (
                            <li key={index} className="mb-3">
                                <a href="#" className="text-white text-decoration-none d-flex align-items-center p-2 rounded" onClick={() => toggleMenu(item.title)}>
                                    <i className={`bi ${item.icon} me-2`}></i> {item.title}
                                </a>
                                {activeMenu === item.title && (
                                    <ul className="list-unstyled ps-4">
                                        {item.links.map((link, subIndex) => (
                                            <li key={subIndex}>
                                                <Link to={link.to} className="text-decoration-none text-white d-block p-2 rounded">
                                                    <i className={`bi ${link.icon} me-2`}></i> {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                        <li className="mt-4">
                            <a href="#" className="text-white text-decoration-none d-flex align-items-center p-2 rounded" onClick={CerrarSesion}>
                                <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Modal de Perfil */}
            <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Perfil' : 'Perfil de Administrador'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <img
                            src={profileData.profilePicture} // Foto de perfil
                            className="rounded-circle w-50 mx-auto d-block mb-3"
                            alt="Foto de perfil"
                        />
                        {isEditing ? (
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control mb-3"
                                onChange={handleProfilePictureChange}
                            />
                        ) : null}
                    </div>
                    <div>
                        {isEditing ? (
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Nombre:</strong> {profileData.name}</p>
                                <p><strong>Correo Electrónico:</strong> {profileData.email}</p>
                                <p><strong>Rol:</strong> {profileData.role}</p>
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? (
                        <button className="btn btn-primary" onClick={handleSaveProfile}>
                            Guardar
                        </button>
                    ) : (
                        <button className="btn btn-warning" onClick={handleEditProfile}>
                            Editar Perfil
                        </button>
                    )}
                    <button className="btn btn-secondary" onClick={handleCloseProfileModal}>
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
        
    );
}
