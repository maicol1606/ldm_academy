import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cerrarSesion from '../hooks/cerrarSesion.js';

export default function NavegacionAdmin() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const CerrarSesion = cerrarSesion();

    const [profileData, setProfileData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        rol: 'Administrador',
        profilePicture: '/img/navegacion/Avatar2.png',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/docentes/obtenerPerfilDocente', {
                    withCredentials: true
                });
                setProfileData((prevData) => ({
                    ...prevData,
                    nombre: res.data.nombre,
                    correo: res.data.correo,
                    telefono: res.data.telefono
                }));
            } catch (error) {
                console.error('Error al obtener datos del perfil:', error);
            }
        };

        fetchUserData();
    }, []);

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleProfileClick = () => setShowProfileModal(true);
    const handleCloseProfileModal = () => {
        setShowProfileModal(false);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { nombre, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [nombre]: value }));
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

    const handleSaveProfile = async () => {
        try {
            const response = await fetch('/api/docente', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: profileData.nombre,
                    correo: profileData.correo,
                    telefono: profileData.telefono,
                }),
            });

            if (response.ok) {
                setIsEditing(false);
                console.log('Perfil actualizado correctamente.');
            } else {
                console.error('Error al guardar los cambios del perfil');
            }
        } catch (error) {
            console.error('Error de red al guardar el perfil:', error);
        }
    };

    useEffect(() => {
        const offcanvasElement = document.getElementById('offcanvasAdmin');
        if (offcanvasElement) {
            const handleShow = () => setMenuOpen(true);
            const handleHide = () => setMenuOpen(false);

            offcanvasElement.addEventListener('show.bs.offcanvas', handleShow);
            offcanvasElement.addEventListener('hide.bs.offcanvas', handleHide);

            return () => {
                offcanvasElement.removeEventListener('show.bs.offcanvas', handleShow);
                offcanvasElement.removeEventListener('hide.bs.offcanvas', handleHide);
            };
        }
    }, []);

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
                style={{ width: '200px', backgroundColor: '#000' }}
            >
                <div className="offcanvas-header border-bottom">
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
                        <p className="h6">{profileData.nombre}</p>
                    </div>

                    <ul className="list-unstyled mt-4">
                        <li><Link to="/" className="text-white text-decoration-none d-flex align-items-center p-2 rounded"><i className="bi bi-house-door me-2"></i> Página de Inicio</Link></li>
                        <li><Link to="/NotificacionesAdmin" className="text-white text-decoration-none d-flex align-items-center p-2 rounded"><i className="bi bi-bell me-2"></i> Notificaciones</Link></li>
                        {[{
                            title: 'Estudiantes',
                            icon: 'bi-person',
                            links: [
                                { to: '/EstudianteNew', text: 'Agregar Estudiante', icon: 'bi-person-plus' },
                                { to: '/EstudianteList', text: 'Lista de Estudiantes', icon: 'bi-person-lines-fill' }
                            ]
                        }, {
                            title: 'Docentes',
                            icon: 'bi-person-badge',
                            links: [
                                { to: '/DocenteNew', text: 'Agregar Docente', icon: 'bi-person-plus' },
                                { to: '/DocenteList', text: 'Lista de Docentes', icon: 'bi-person-lines-fill' }
                            ]
                        }, {
                            title: 'Campañas',
                            icon: 'bi-flag',
                            links: [
                                { to: '/CampaignNew', text: 'Crear Campaña', icon: 'bi-plus-circle' },
                                { to: '/CampaignList', text: 'Lista de Campañas', icon: 'bi-list' }
                            ]
                        }, {
                            title: 'Certificados',
                            icon: 'bi-file-earmark-check',
                            links: [
                                { to: '/CertificadoAdmin', text: 'Lista de Certificados', icon: 'bi-file-earmark' }
                            ]
                        }].map((item, index) => (
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
            </div>

            <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Perfil' : 'Perfil de Administrador'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <img
                            src={profileData.profilePicture}
                            className="rounded-circle w-50 mx-auto d-block mb-3"
                            alt="Foto de perfil"
                        />
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control mb-3"
                                onChange={handleProfilePictureChange}
                            />
                        )}
                    </div>
                    <div>
                        {isEditing ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        value={profileData.nombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="correo"
                                        value={profileData.correo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="telefono"
                                        value={profileData.telefono}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p><strong>Nombre:</strong> {profileData.nombre}</p>
                                <p><strong>Correo Electrónico:</strong> {profileData.correo}</p>
                                <p><strong>Teléfono:</strong> {profileData.telefono}</p>
                                <p><strong>Rol:</strong> {profileData.rol}</p>
                            </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? (
                        <button className="btn btn-primary" onClick={handleSaveProfile}>
                            Guardar
                        </button>
                    ) : (
                        <button className="btn btn-secondary" onClick={handleEditProfile}>
                            Editar
                        </button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

