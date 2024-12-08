import React, { useState } from 'react';

export default function NavegacionEstudiante() {
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const [editarPerfil, setEditarPerfil] = useState(false);

    const abrirPerfil = () => setMostrarPerfil(true);
    const cerrarPerfil = () => setMostrarPerfil(false);
    const abrirEditarPerfil = () => setEditarPerfil(true);
    const cerrarEditarPerfil = () => setEditarPerfil(false);

    return (
        <div>
            {/* Botón para abrir el menú */}
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <i className="bi bi-arrow-right"></i>
            </button>

            {/* Menú de navegación */}
            <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: '250px' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {/* Sección del perfil */}
                    <img
                        src="/img/navegacion/Avatar2.png"
                        className="rounded-circle w-50 mx-auto d-block img-fluid mb-3"
                        alt="Foto de perfil"
                        style={{ cursor: 'pointer' }}
                        onClick={abrirPerfil}
                    />
                    <div className="text-center mb-3">
                        <p className="h6">Estudiantes</p>
                    </div>

                    {/* Menú de opciones */}
                    <ul className="list-unstyled">
                        <li className="mb-4">
                            <a href="#" className="text-decoration-none text-white">
                                <i className="bi bi-clock text-white me-2"></i>Ver Horas
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="text-decoration-none text-white">
                                <i className="bi bi-info-circle text-white me-2"></i>Información de la Campaña
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="text-decoration-none text-white">
                                <i className="bi bi-list-task text-white me-2"></i>Lista de Campañas
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="text-decoration-none text-white">
                                <i className="bi bi-bell text-white me-2"></i>Notificaciones
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="text-decoration-none text-white">
                                <i className="bi bi-clipboard2-check text-white me-2"></i>Certificados
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Modal para mostrar el perfil */}
            {mostrarPerfil && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="modalPerfilLabel" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalPerfilLabel">Perfil del Estudiante</h5>
                                <button type="button" className="btn-close" onClick={cerrarPerfil} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex justify-content-center mb-3">
                                    <img
                                        src="/img/navegacion/Avatar2.png"
                                        className="rounded-circle w-50"
                                        alt="Foto de perfil"
                                    />
                                </div>
                                <p><strong>Nombre:</strong> [Nombre del Estudiante]</p>
                                <p><strong>Campaña:</strong> [Campaña]</p>
                                <p><strong>Horas:</strong> [Horas]</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={abrirEditarPerfil}>Editar Perfil</button>
                                <button className="btn btn-primary" onClick={cerrarPerfil}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para editar el perfil */}
            {editarPerfil && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="modalEditarPerfilLabel" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalEditarPerfilLabel">Editar Perfil</h5>
                                <button type="button" className="btn-close" onClick={cerrarEditarPerfil} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="campaña" className="form-label">Campaña</label>
                                        <input type="text" className="form-control" id="campaña" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="horas" className="form-label">Horas</label>
                                        <input type="number" className="form-control" id="horas" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="foto" className="form-label">Foto de Perfil</label>
                                        <input type="file" className="form-control" id="foto" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" type="submit">Guardar Cambios</button>
                                <button className="btn btn-secondary" onClick={cerrarEditarPerfil}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
