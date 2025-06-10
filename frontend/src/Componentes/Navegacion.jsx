import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// Hooks
import CerrarSesion from "../lib/cerrarSesion.js";
import { useGetData, usePutData } from "../lib/fetchData";
import { useAuth } from "../contexts/authContext.jsx";
import axios from "axios";

export default function Navegacion() {
    const { data: userSesion, loading: loadingUserSesion } = useAuth();

    const {
        data: user,
        loading: loadingUser,
        reload: reloadUser,
    } = useGetData("/usuarios/" + userSesion?.id_usuario);
    const { data: asistencias, loading: loadingAsistencia } = useGetData(
        `/asistencia/mostrarAsistencias/${user?.id_usuario}`
    );

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [user]);

    if (loadingUserSesion || loadingUser) return <h1>Cargando...</h1>;

    return (
        <>
            <aside
                className={`${
                    user
                        ? "bg-dark text-white border-dark"
                        : "bg-light text-dark border-dark-subtle"
                } border-end col-1`}
                style={{
                    width: "80px",
                    height: "100vh",
                    zIndex: 9999,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                }}
            >
                {!user && (
                    <Link to="/" className="d-block w-100" style={{ aspectRatio: "1/1" }}>
                        <img
                            src="/logo.png"
                            alt="Logo LDM Academy"
                            className="w-100 h-100 object-fit-contain"
                        />
                    </Link>
                )}

                {user && (
                    <div
                        data-bs-toggle="tooltip"
                        data-bs-title="Ver perfil"
                        data-bs-placement="right"
                    >
                        <img
                            src={user.foto || "/img/navegacion/Avatar2.png"}
                            className="rounded-circle img-fluid mb-3"
                            alt="Perfil"
                            style={{ width: "50px", height: "50px", cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#profileModal"
                        />
                    </div>
                )}

                {/* Menú de navegación */}
                <ul className="nav flex-column" style={{ listStyle: "none", marginTop: "20px" }}>
                    {!user && (
                        <>
                            <li
                                className="nav-item"
                                data-bs-toggle="tooltip"
                                data-bs-title="Inicio"
                                data-bs-placement="right"
                            >
                                <Link
                                    to="/"
                                    className="nav-link"
                                    style={{ fontSize: "1.5rem", color: "inherit" }}
                                >
                                    <i className="bi bi-house-door"></i>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                data-bs-toggle="tooltip"
                                data-bs-title="Iniciar sesión"
                                data-bs-placement="right"
                            >
                                <Link
                                    to="/login"
                                    className="nav-link"
                                    style={{ fontSize: "1.5rem", color: "inherit" }}
                                >
                                    <i className="bi bi-person-circle"></i>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                data-bs-toggle="tooltip"
                                data-bs-title="Registrarse"
                                data-bs-placement="right"
                            >
                                <Link
                                    to="/register"
                                    className="nav-link"
                                    style={{ fontSize: "1.5rem", color: "inherit" }}
                                >
                                    <i className="bi bi-person-plus"></i>
                                </Link>
                            </li>
                        </>
                    )}

                    {user && <MenuLinks rol={user.id_rol} />}
                </ul>
            </aside>

            {user && <UserModal user={user} asistencias={asistencias} userReload={reloadUser} />}
        </>
    );
}

function MenuLinks({ rol }) {
    const links = {
        1: [
            {
                icon: "bi bi-house-door",
                title: "Página de Inicio",
                link: "/",
            },
            {
                icon: "bi bi-person",
                title: "Estudiantes",
                submenu: [
                    {
                        icon: "bi bi-person-plus",
                        title: "Agregar Estudiante",
                        link: "/EstudianteNew",
                    },
                    {
                        icon: "bi bi-person-lines-fill",
                        title: "Lista de Estudiantes",
                        link: "/EstudianteList",
                    },
                ],
            },
            {
                icon: "bi bi-person-badge",
                title: "Docentes",
                submenu: [
                    {
                        icon: "bi bi-person-plus",
                        title: "Agregar Docente",
                        link: "/DocenteNew",
                    },
                    {
                        icon: "bi bi-person-lines-fill",
                        title: "Lista de Docentes",
                        link: "/DocenteList",
                    },
                ],
            },
            {
                icon: "bi bi-flag",
                title: "Campañas",
                submenu: [
                    {
                        icon: "bi bi-plus-circle",
                        title: "Crear Campaña",
                        link: "/CampaignNew",
                    },
                    {
                        icon: "bi bi-list",
                        title: "Lista de Campañas",
                        link: "/CampaignList",
                    },
                ],
            },
            {
                icon: "bi bi-file-earmark-check",
                title: "Certificados",
                link: "/CertificadoAdmin",
            },
        ],
        2: [
            {
                icon: "bi bi-clock",
                title: "Ver horas",
                link: "/horas",
            },
            {
                icon: "bi bi-info-circle",
                title: "Información de la campaña",
                link: "/HomeEstudiante",
            },
            {
                icon: "bi bi-clipboard2-check",
                title: "Certificados",
                link: "/GenCertificados",
            },
        ],
        3: [
            {
                icon: "bi bi-house-door",
                title: "Página de Inicio",
                link: "/homeDocenteS",
            },
            {
                icon: "bi bi-clock",
                title: "Asignar Horas",
                link: "/asignarhoras",
            },
            {
                icon: "bi bi-bell",
                title: "Notificaciones",
                link: "/postulacionesDocente",
            },
            {
                icon: "bi bi-pencil",
                title: "Gestionar Campaña",
                link: "/gestionarCampañas",
            },
        ],
    };

    return (
        <>
            {links[rol].map((link) => {
                if (link.submenu) {
                    return (
                        <li
                            key={link.title}
                            className="dropend"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-title={link.title}
                            data-bs-placement="right"
                        >
                            <a
                                className="nav-link text-white dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ fontSize: "1.5rem" }}
                            >
                                <i className={link.icon}></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    {link.submenu.map((submenu) => (
                                        <Link
                                            key={submenu.title}
                                            to={submenu.link}
                                            className="dropdown-item"
                                        >
                                            <i className={submenu.icon}></i> {submenu.title}
                                        </Link>
                                    ))}
                                </li>
                            </ul>
                        </li>
                    );
                }
                return (
                    <li
                        key={link.title}
                        className="nav-item"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-title={link.title}
                        data-bs-placement="right"
                        style={{ padding: "0px", margin: "0px" }}
                    >
                        <Link
                            to={link.link}
                            className="nav-link fs-4 text-center"
                            style={{ color: "inherit" }}
                        >
                            <i className={link.icon}></i>
                        </Link>
                    </li>
                );
            })}
            <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-title="Cerrar sesión"
                data-bs-placement="right"
                style={{ padding: "0px", margin: "0px" }}
            >
                <a
                    onClick={() => CerrarSesion()}
                    className="nav-link fs-4 text-center"
                    style={{ color: "inherit" }}
                >
                    <i className="bi bi-box-arrow-right"></i>
                </a>
            </li>
        </>
    );
}

function UserModal({ user, asistencias, userReload }) {
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const response = await axios.put(
            import.meta.env.VITE_PUBLIC_API_DOMAIN + "/api/usuarios/" + user.id_usuario,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status === 200) {
            Swal.fire({
                title: "Perfil actualizado",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                userReload();
            });
        } else {
            Swal.fire({
                title: "Error",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    const horasHechas = asistencias.reduce((total, a) => total + a.horas, 0);
    const horasInvalidas = asistencias.reduce(
        (total, a) => (a.novedades ? total + a.horas : total),
        0
    );
    const horasTotales = 120 + horasInvalidas;

    return (
        <>
            <div
                className="modal fade"
                id="profileModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Perfil del {user.rol_nombre}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <img
                                src={user.foto || "/img/navegacion/Avatar2.png"}
                                alt="Perfil"
                                className="rounded-circle mb-3"
                                style={{ width: "100px", height: "100px" }}
                            />
                            <p>
                                <strong>Nombre:</strong> {user.nombre} {user.apellido}
                            </p>
                            <p>
                                <strong>Correo electrónico:</strong> {user.correo}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {user.telefono}
                            </p>
                            <p>
                                <strong> Curso:</strong> {user.curso}
                            </p>
                            {user.id_rol === 2 && (
                                <>
                                    <p>
                                        <strong>
                                            Campaña{user.campañas.length > 1 ? "s" : ""}:
                                        </strong>{" "}
                                        {user.campañas.length > 0
                                            ? user.campañas
                                                  .map((campaña) => campaña.nom_campaña)
                                                  .join(", ")
                                            : "No hay campañas"}
                                    </p>
                                    <p>
                                        <strong>Horas revisadas:</strong>{" "}
                                        {horasHechas}
                                        {" de "}
                                        {horasTotales}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#editProfileModal"
                                className="btn btn-primary"
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <div
                className="modal fade"
                id="editProfileModal"
                tabIndex="-1"
                aria-labelledby="editProfileModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Editar Perfil
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <img
                                src={user.profileImage || "/img/navegacion/Avatar2.png"}
                                alt="Perfil"
                                className="rounded-circle mb-3"
                                style={{ width: "100px", height: "100px" }}
                            />
                            <form
                                onSubmit={handleUpdateProfile}
                                id="editProfileForm"
                                encType="multipart/form-data"
                            >
                                <div className="mb-3">
                                    <label htmlFor="foto" className="form-label">
                                        Foto
                                    </label>
                                    <input
                                        className="form-control"
                                        name="foto"
                                        type="file"
                                        id="foto"
                                        accept="image/*"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">
                                        Nombre
                                    </label>
                                    <input
                                        className="form-control"
                                        name="nombre"
                                        type="text"
                                        id="nombre"
                                        defaultValue={user.nombre}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellido" className="form-label">
                                        Apellido
                                    </label>
                                    <input
                                        className="form-control"
                                        name="apellido"
                                        type="text"
                                        id="apellido"
                                        defaultValue={user.apellido}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">
                                        Correo electrónico
                                    </label>
                                    <input
                                        className="form-control"
                                        name="correo"
                                        type="email"
                                        id="correo"
                                        defaultValue={user.correo}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">
                                        Teléfono
                                    </label>
                                    <input
                                        className="form-control"
                                        name="telefono"
                                        type="tel"
                                        id="telefono"
                                        defaultValue={user.telefono}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="curso" className="form-label">
                                        Curso
                                    </label>
                                    <input
                                        className="form-control"
                                        name="curso"
                                        type="text"
                                        id="curso"
                                        defaultValue={user.curso}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                form="editProfileForm"
                                className="btn btn-primary"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
