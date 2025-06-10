import axios from "axios";
import {
    FaUserClock,
    FaClock,
    FaPlus,
    FaExclamationTriangle,
    FaEdit,
    FaInfoCircle,
    FaCheckCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

const AsignarHoras = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false); // Declaración de mostrarDetalle

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [novedades, setNovedades] = useState("");
    const [nuevasHoras, setNuevasHoras] = useState("");
    const [fecha, setFecha] = useState("");

    const [modalMensaje, setModalMensaje] = useState("");
    const [tipoModal, setTipoModal] = useState("success");

    useEffect(() => {
        const obtenerEstudiantes = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/estudiantes/obtenerEstudiantes`
                );
                setEstudiantes(res.data.);
            } catch (err) {
                console.error(err);
            }
        };
        obtenerEstudiantes();
    }, []);

    const seleccionarEstudiante = (idUsuario) => {
        const estudiante = estudiantes.find((e) => e.id_usuario === idUsuario);
        if (estudiante) {
            setEstudianteSeleccionado(estudiante);
            setMostrarDetalle(true);
        }
    };

    const enviarAsistencia = async () => {
        if (!horaInicio || !horaFin || isNaN(nuevasHoras) || nuevasHoras < 1 || nuevasHoras > 6) {
            setTipoModal("error");
            setModalMensaje("Completa todos los campos correctamente.");
            setMostrarModal(true);
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/asistencia/agregarAsistencia`, {
                id_usuario: estudianteSeleccionado.id_usuario,
                id_campaña: estudianteSeleccionado.id_campaña,
                fecha, // Este campo debe existir en los datos del estudiante
                hora_Inicio: horaInicio,
                hora_fin: horaFin,
                horas: nuevasHoras,
                novedades,
            });

            setTipoModal("success");
            setModalMensaje("Asistencia registrada correctamente.");
            setMostrarModal(true);
            setMostrarFormulario(false);

            // Limpieza y recarga de datos
            setHoraInicio("");
            setHoraFin("");
            setNovedades("");
            setNuevasHoras("");
            setFecha("");

            const res = await axios.get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/estudiantes/obtenerEstudiantes`);
            setEstudiantes(res.data);
            const actualizado = res.data.find(
                (e) => e.id_usuario === estudianteSeleccionado.id_usuario
            );
            setEstudianteSeleccionado(actualizado);
        } catch (error) {
            console.error(error);
            setTipoModal("error");
            setModalMensaje("Error al registrar asistencia.");
            setMostrarModal(true);
        }
    };

    const handleHorasChange = (e) => {
        const valor = parseInt(e.target.value);
        if (!isNaN(valor) && valor >= 1 && valor <= 6) {
            setNuevasHoras(valor);
        } else {
            setNuevasHoras("");
        }
    };

    const obtenerDatosEstudiante = (id) => {
        if (!estudianteSeleccionado || estudianteSeleccionado.id_usuario !== id) {
            axios
                .get(`http://localhost:3001/api/estudiantes/asistenciaEstudiante/${id}`)

                .then((res) => {
                    setEstudianteSeleccionado(res.data.data); // Aquí se guardan los datos completos del estudiante, incluyendo el historial de asistencia
                    setMostrarModal(true); // abre el modal
                })
                .catch((err) => console.error(err));
        }
    };

    const calcularHoras = (inicio, fin) => {
        if (!inicio || !fin) return;

        const [hInicio, mInicio] = inicio.split(":").map(Number);
        const [hFin, mFin] = fin.split(":").map(Number);

        const minutosInicio = hInicio * 60 + mInicio;
        const minutosFin = hFin * 60 + mFin;

        let diferenciaHoras = (minutosFin - minutosInicio) / 60;

        if (diferenciaHoras <= 0) {
            setNuevasHoras(0); // o puedes mostrar error
        } else if (diferenciaHoras > 6) {
            setNuevasHoras(6); // máximo permitido
        } else {
            setNuevasHoras(Math.floor(diferenciaHoras));
        }
    };
    useEffect(() => {
        calcularHoras(horaInicio, horaFin);
    }, [horaInicio, horaFin]);

    return (
        <>
            {mostrarModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className={`modal-content border-${
                                tipoModal === "success" ? "success" : "danger"
                            }`}
                        >
                            <div
                                className={`modal-header bg-${
                                    tipoModal === "success" ? "success" : "danger"
                                } text-white`}
                            >
                                <h5 className="modal-title">
                                    {tipoModal === "success" ? "Éxito" : "Error"}
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setMostrarModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMensaje}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setMostrarModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de información del estudiante */}
            {mostrarDetalle && estudianteSeleccionado && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content p-3">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <FaInfoCircle /> Información del Estudiante
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setMostrarDetalle(false)}
                                ></button>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            setMostrarFormulario(true);
                                            setMostrarDetalle(false); // Opcional: cerrar el detalle cuando abres el form
                                        }}
                                    >
                                        <FaPlus /> Registrar Asistencia
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setMostrarDetalle(false)}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <h6>Nombre: {estudianteSeleccionado.nombre}</h6>
                                <p>Numero: {estudianteSeleccionado.id_usuario}</p>
                                <p>
                                    Total de Horas:{" "}
                                    {estudianteSeleccionado.horas?.reduce(
                                        (acc, a) => acc + a.horas,
                                        0
                                    )}
                                </p>
                                <p>Días asistidos: {estudianteSeleccionado.fecha?.length}</p>
                                <hr />
                                <h6>Historial de asistencia:</h6>
                                {estudianteSeleccionado.historial?.length > 0 ? (
                                    <ul className="list-group">
                                        {estudianteSeleccionado.historial.map((a, index) => (
                                            <li key={index} className="list-group-item">
                                                Fecha: {a.fecha} | Inicio: {a.hora_inicio} | Fin:{" "}
                                                {a.hora_fin} | Horas: {a.horas}
                                                {a.novedades && (
                                                    <div className="text-muted">
                                                        Novedades: {a.novedades}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No hay historial de asistencia disponible.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setMostrarDetalle(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contenido principal */}
            <div className="d-flex">
                <div className="container">
                    <h2 className="text-center mb-4 text-primary fw-bold">
                        <FaClock className="me-2" /> Asignar Horas a Estudiantes
                    </h2>

                    {/* Lista de estudiantes */}
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">
                                <FaUserClock /> Seleccionar Estudiante
                            </h5>
                            <div className="row">
                                {estudiantes.map((estudiante) => (
                                    <div key={estudiante.id_usuario} className="col-md-4 mb-4">
                                        <div className="card shadow rounded-4 border-0 h-100">
                                            <div className="card-body text-center">
                                                <FaUserClock
                                                    size={32}
                                                    className="text-primary mb-2"
                                                />
                                                <h5 className="card-title fw-semibold">
                                                    {estudiante.nombre}
                                                </h5>
                                                <p className="text-muted mb-2">
                                                    ID: {estudiante.id_usuario}
                                                </p>
                                                <button
                                                    className="btn btn-outline-primary btn-sm rounded-pill"
                                                    onClick={() =>
                                                        seleccionarEstudiante(estudiante.id_usuario)
                                                    }
                                                >
                                                    <FaInfoCircle className="me-1" /> Ver Detalles
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Formulario para registrar asistencia */}
                    {mostrarFormulario && (
                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content rounded-4 shadow p-4 border-0">
                                    <div className="modal-header bg-success text-white rounded-top-4">
                                        <h5 className="modal-title">
                                            <FaPlus className="me-2" /> Registrar Asistencia
                                        </h5>
                                        <button
                                            className="btn-close"
                                            onClick={() => setMostrarFormulario(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                enviarAsistencia();
                                            }}
                                        >
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">
                                                        Fecha
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={fecha}
                                                        onChange={(e) => setFecha(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">
                                                        Horas
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={nuevasHoras}
                                                        min="1"
                                                        max="6"
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">
                                                        Hora de Inicio
                                                    </label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        value={horaInicio}
                                                        onChange={(e) =>
                                                            setHoraInicio(e.target.value)
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">
                                                        Hora de Fin
                                                    </label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        value={horaFin}
                                                        onChange={(e) => setHoraFin(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold">
                                                        Novedades
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        value={novedades}
                                                        onChange={(e) =>
                                                            setNovedades(e.target.value)
                                                        }
                                                    >
                                                        <option value="">Sin novedad</option>
                                                        <option value="No porta el carnet">
                                                            No porta el carnet
                                                        </option>
                                                        <option value="no asistió">
                                                            No asistió
                                                        </option>
                                                        <option value="no hace uso del uniforme">
                                                            No hace uso del uniforme
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="col-12 text-end">
                                                    <button
                                                        className="btn btn-success rounded-pill px-4 mt-3"
                                                        type="submit"
                                                    >
                                                        <FaCheckCircle className="me-2" /> Guardar
                                                        Asistencia
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AsignarHoras;
