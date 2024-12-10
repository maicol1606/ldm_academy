import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function NavegacionAdmin() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Administrador',
        email: 'admin@gmail.com',
        role: 'Administrador',
        profilePicture: '/img/navegacion/Avatar2.png',
    });
    const [isEditing, setIsEditing] = useState(false);

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
        setProfileData({ ...profileData, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileData({ ...profileData, profilePicture: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleEditProfile = () => setIsEditing(true);

    const handleSaveProfile = () => setIsEditing(false);

    return (
        <div>
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasAdmin"
                aria-controls="offcanvasAdmin"
            >
                <i className="bi bi-list"></i>
            </button>

            <div
                className="offcanvas offcanvas-start bg-dark text-white"
                tabIndex="-1"
                id="offcanvasAdmin"
                aria-labelledby="offcanvasAdminLabel"
                style={{ width: '300px' }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAdminLabel">Menú Administrador</h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <div className="text-center">
                        <img
                            src={profileData.profilePicture}
                            className="rounded-circle w-50 border border-light mb-3"
                            alt="Avatar"
                            style={{ cursor: 'pointer' }}
                            onClick={handleProfileClick}
                        />
                        <h6>{profileData.name}</h6>
                    </div>

                    <ul className="list-unstyled mt-4">
                        <li className="mb-3">
                            <button
                                className="btn btn-dark w-100 text-start"
                                onClick={() => toggleMenu('estudiantes')}
                            >
                                <i className="bi bi-person me-2"></i> Estudiantes
                            </button>
                            {activeMenu === 'estudiantes' && (
                                <ul className="list-unstyled ps-4">
                                    <li><button className="btn btn-dark w-100 text-start">Agregar Estudiante</button></li>
                                    <li><button className="btn btn-dark w-100 text-start">Lista de Estudiantes</button></li>
                                </ul>
                            )}
                        </li>
                        <li className="mb-3">
                            <button
                                className="btn btn-dark w-100 text-start"
                                onClick={() => toggleMenu('docentes')}
                            >
                                <i className="bi bi-person-plus me-2"></i> Docentes
                            </button>
                            {activeMenu === 'docentes' && (
                                <ul className="list-unstyled ps-4">
                                    <li><button className="btn btn-dark w-100 text-start">Agregar Docente</button></li>
                                    <li><button className="btn btn-dark w-100 text-start">Lista de Docentes</button></li>
                                </ul>
                            )}
                        </li>
                        <li className="mb-3">
                            <button
                                className="btn btn-dark w-100 text-start"
                                onClick={() => toggleMenu('campanas')}
                            >
                                <i className="bi bi-flag me-2"></i> Campañas
                            </button>
                            {activeMenu === 'campanas' && (
                                <ul className="list-unstyled ps-4">
                                    <li><button className="btn btn-dark w-100 text-start">Crear Campaña</button></li>
                                    <li><button className="btn btn-dark w-100 text-start">Lista de Campañas</button></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <Modal show={showProfileModal} onHide={handleCloseProfileModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Perfil' : 'Perfil de Administrador'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <img
                            src={profileData.profilePicture}
                            className="rounded-circle w-50"
                            alt="Avatar"
                        />
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control mt-3"
                                onChange={handleProfilePictureChange}
                            />
                        )}
                    </div>
                    {isEditing ? (
                        <div>
                            <div className="mb-3">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Correo Electrónico</label>
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
                            <p><strong>Correo:</strong> {profileData.email}</p>
                            <p><strong>Rol:</strong> {profileData.role}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? (
                        <Button variant="primary" onClick={handleSaveProfile}>Guardar</Button>
                    ) : (
                        <Button variant="warning" onClick={handleEditProfile}>Editar</Button>
                    )}
                    <Button variant="secondary" onClick={handleCloseProfileModal}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}