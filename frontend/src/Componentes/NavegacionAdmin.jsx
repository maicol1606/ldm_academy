import React, { useState} from 'react';
import {Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cerrarSesion from '../hooks/cerrarSesion.JS';

export default function NavegacionAdmin() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false)
    const CerrarSesion = cerrarSesion(); ;
    const [profileData, setProfileData] = useState({
        name: 'Administrador',
        email: 'admin@gmail.com',
        role: 'Administrador',
        profilePicture: '/img/navegacion/Avatar2.png',
    });
    const [isEditing, setIsEditing] = useState(false);

    // Función para manejar la expansión de los menús
    const toggleMenu = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu(null); // Si el menú ya está abierto, lo cerramos
        } else {
            setActiveMenu(menu); // Si no está abierto, lo abrimos
        }
    };

    const handleProfileClick = () => {
        setShowProfileModal(true); // Abrir modal de perfil
    };

    const handleCloseProfileModal = () => {
        setShowProfileModal(false); // Cerrar modal de perfil
        setIsEditing(false); // Resetear el estado de edición
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePicture: reader.result, // Actualiza la imagen con el archivo seleccionado
                }));
            };
            reader.readAsDataURL(file); // Convierte el archivo a una URL base64
        }
    };

    const handleEditProfile = () => {
        setIsEditing(true); // Activar el modo de edición
    };

    const handleSaveProfile = () => {
        // Aquí puedes agregar lógica para guardar los cambios en el backend
        setIsEditing(false); // Desactivar el modo de edición
    };

    return (
        <div>
            {/* Botón para abrir el menú */}
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasAdmin"
                aria-controls="offcanvasAdmin"
            >
                <i className="bi bi-arrow-right"></i>
            </button>

            {/* Menú de navegación */}
            <div
                className="offcanvas offcanvas-start bg-dark text-white"
                tabIndex="-1"
                id="offcanvasAdmin"
                aria-labelledby="offcanvasAdminLabel"
                style={{ width: '250px' }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAdminLabel"></h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    {/* Foto de perfil */}
                    <img
                        src={profileData.profilePicture} // Ruta de la imagen de perfil
                        className="rounded-circle w-50 mx-auto d-block img-fluid mb-3 border border-light"
                        alt="Foto de perfil"
                        style={{ cursor: 'pointer' }}
                        onClick={handleProfileClick} // Abre el modal al hacer clic
                    />
                    <div className="text-center mb-3">
                        <p className="h6">{profileData.name}</p>
                    </div>

                    {/* Opciones del menú */}
                    <ul className="list-unstyled">
                        {/* Estudiantes */}
                        <li className="mb-3">
                            <a
                                href="#"
                                className="text-decoration-none text-white"
                                onClick={() => toggleMenu('estudiantes')}
                                style={{ display: 'block', padding: '10px', borderRadius: '5px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#343a40'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <i className="bi bi-person text-white me-2"></i> Estudiantes
                            </a>
                            {/* Submenú de Estudiantes */}
                            {activeMenu === 'estudiantes' && (
                                <ul className="list-unstyled ps-4">
                                    <li><Link to="/EstudianteNew" className="text-decoration-none text-white"><i className="bi bi-person-plus me-2"></i> Agregar Estudiante</Link></li>
                                    <li><Link to="/EstudianteList" className="text-decoration-none text-white"><i className="bi bi-person-lines-fill me-2"></i> Lista de Estudiantes</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* Docentes */}
                        <li className="mb-3">
                            <a
                                href="#"
                                className="text-decoration-none text-white"
                                onClick={() => toggleMenu('docentes')}
                                style={{ display: 'block', padding: '10px', borderRadius: '5px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#343a40'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <i className="bi bi-person-plus text-white me-2"></i> Docentes
                            </a>
                            {/* Submenú de Docentes */}
                            {activeMenu === 'docentes' && (
                                <ul className="list-unstyled ps-4">
                                    <li><Link to="/DocenteNew"  className="text-decoration-none text-white"><i className="bi bi-person-plus me-2"></i> Agregar Docente</Link></li>
                                    <li>< Link to="/DocenteList"  className="text-decoration-none text-white"><i className="bi bi-person-lines-fill me-2"></i> Lista de Docentes</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* Campañas */}
                        <li className="mb-3">
                            <a
                                href="#"
                                className="text-decoration-none text-white"
                                onClick={() => toggleMenu('campanas')}
                                style={{ display: 'block', padding: '10px', borderRadius: '5px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#343a40'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <i className="bi bi-flag text-white me-2"></i> Campañas
                            </a>
                            {/* Submenú de Campañas */}
                            {activeMenu === 'campanas' && (
                                <ul className="list-unstyled ps-4">
                                    <li><Link to="/CampaignNew" className="text-decoration-none text-white"><i className="bi bi-plus-circle me-2"></i> Crear Campaña</Link></li>
                                    <li><Link to="/CampaignList"  className="text-decoration-none text-white"><i className="bi bi-list me-2"></i> Lista de Campañas</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* Certificados */}
                        <li className="mb-3">
                            <a
                                href="#"
                                className="text-decoration-none text-white"
                                onClick={() => toggleMenu('certificados')}
                                style={{ display: 'block', padding: '10px', borderRadius: '5px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#343a40'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <i className="bi bi-file-earmark-check text-white me-2"></i> Certificados
                            </a>
                            {/* Submenú de Certificados */}
                            {activeMenu === 'certificados' && (
                                <ul className="list-unstyled ps-4">
                                    <li><Link to="/CertificadoAdmin" className="text-decoration-none text-white"><i className="bi bi-file-earmark me-2"></i> Lista de Certificados</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="mb-3">
                            <a
                                href="#"
                                className="text-decoration-none text-white"
                                onClick={CerrarSesion}
                                style={{ display: 'block', padding: '10px', borderRadius: '5px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#343a40'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <i className="bi bi-box-arrow-right text-white me-2"></i> Cerrar Sesion
                            </a>
                        </li>
                    </ul>
                </div>
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
    );
}
