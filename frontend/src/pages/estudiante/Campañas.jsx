import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { useAuth } from "../../contexts/authContext";

export default function InfoCampañas() {
    const { data: user, loading: loadingUser } = useAuth();
    const id_user = user?.id_usuario;

    const navigate = useNavigate();

    const [showPostuladoModal, setShowPostuladoModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const [campanas, setCampanas] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [postulaciones, setPostulaciones] = useState([]);

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
        );

        const fetchData = async () => {
            try {
                const [campanasRes, postulacionesRes, docentesRes] = await Promise.all([
                    axios.get(
                        `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/campanas/mostrarCampanas`
                    ),
                    axios.get(
                        `${
                            import.meta.env.VITE_PUBLIC_API_DOMAIN
                        }/api/postulacion/mostrarPostulacion/${id_user}`
                    ),
                    axios.get(
                        `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/docentes/obtenerDocentes`
                    ),
                ]);
                setCampanas(campanasRes.data.data);
                setPostulaciones(postulacionesRes.data);
                setDocentes(docentesRes.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    async function verificarPostulacion() {
        if (postulaciones.length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Ya postulaste",
                text: "Ya has postulado para una campaña.",
            }).then(() => {
                navigate("/horas");
            });
        } else {
            return false;
        }
    }

    verificarPostulacion();

    const [postulado, setPostulado] = useState({
        id_usuario: id_user,
        id_campaña: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    // Función para manejar la postulación
    const handlePostular = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/postulacion/agregarPostulacion`,
                postulado
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Postulación realizada",
                    text: "Has postulado correctamente para la campaña.",
                }).then(() => {
                    window.location.href = "/horas";
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error al postular",
                text: error.response.data.error,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Función para mostrar la ventana de información de la campaña
    const handleVerInfo = (index) => {
        setSelectedCampaign(index);
        setShowInfoModal(true);
    };

    if (loadingUser || !campanas || !docentes || !postulaciones) return <div>Cargando...</div>;

    return (
        <div>
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Campañas</h1>
                            <p className="lead text-body-secondary">
                                El servicio social no es solo un requisito, es una oportunidad para
                                marcar la diferencia.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Album Section */}
                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {campanas.map((campana, index) => (
                                <div className="col" key={campana.id_campañas}>
                                    <div className="card shadow-lg border-0 rounded-3 transition-all duration-300 hover:scale-105">
                                        <div className="card-header position-relative">
                                            <img
                                                className="card-img-top rounded-3"
                                                width="100%"
                                                height="225"
                                                src={`/img/campañas/${campana.imagen}`}
                                                role="img"
                                                aria-label="Placeholder: Thumbnail"
                                                preserveAspectRatio="xMidYMid slice"
                                                focusable="false"
                                            />
                                        </div>

                                        <div className="card-body">
                                            <p className="fs-4">{campana.nom_campaña}</p>

                                            <p className="card-text">{campana.descripcion}</p>
                                            <p>
                                                <span className="fw-bold text-primary">
                                                    Fecha de inicio:{" "}
                                                </span>{" "}
                                                {moment(campana.fecha_inicio).format("DD/MM/YYYY")}
                                            </p>
                                            <p>
                                                <span className="fw-bold text-primary">
                                                    Cupos disponibles:{" "}
                                                </span>
                                                {campana.cupos - campana.personas_activas}
                                            </p>
                                            <p>
                                                <span className="fw-bold text-primary">
                                                    Docente:
                                                </span>
                                                {
                                                    docentes.find(
                                                        (docente) =>
                                                            docente.id_usuario == campana.id_docente
                                                    )?.nombre
                                                }{" "}
                                                {
                                                    docentes.find(
                                                        (docente) =>
                                                            docente.id_usuario == campana.id_docente
                                                    )?.apellido
                                                }
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div
                                                    className="btn-group"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title={
                                                        campana.cupos - campana.personas_activas <=
                                                        0
                                                            ? "No hay cupos disponibles"
                                                            : "Postularse"
                                                    }
                                                >
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isLoading ||
                                                            campana.cupos -
                                                                campana.personas_activas <=
                                                                0
                                                        }
                                                        className="btn btn-sm btn-outline-primary transition-all duration-200 hover:bg-primary hover:text-white"
                                                        onClick={() =>
                                                            setShowPostuladoModal(true) ||
                                                            setPostulado({
                                                                id_campaña: campana.id_campaña,
                                                                id_usuario: id_user,
                                                            })
                                                        }
                                                    >
                                                        Postularse
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-info transition-all duration-200 hover:bg-info hover:text-white ms-3"
                                                        onClick={() => handleVerInfo(index)}
                                                    >
                                                        Ver
                                                    </button>
                                                </div>
                                                <small className="text-body-secondary">
                                                    {campana.personas_postuladas} postulado
                                                    {campana.personas_postuladas != 1 ? "s" : ""}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de Postulación */}
            {showPostuladoModal && (
                <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content rounded-4">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Confirmación de Postulación</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowPostuladoModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    ¿Estás seguro de que quieres postularte a esta campaña? Esta
                                    acción es irreversible.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowPostuladoModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    disabled={isLoading}
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handlePostular}
                                >
                                    {isLoading ? (
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        "Confirmar"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Información de la Campaña */}
            {showInfoModal && selectedCampaign !== null && (
                <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content rounded-4">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">
                                    {campanas[selectedCampaign].nom_campaña}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowInfoModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body d-flex">
                                <img
                                    src={`/img/campañas/${campanas[selectedCampaign].imagen}`}
                                    alt="Imagen de la campaña"
                                    className="img-fluid rounded-3 me-4"
                                    style={{ width: "300px", height: "300px" }}
                                />
                                <div>
                                    <p>
                                        <span className="fw-bold text-primary">Descripción: </span>
                                        {campanas[selectedCampaign].descripcion}
                                    </p>
                                    <p>
                                        <span className="fw-bold text-primary">
                                            Fecha de inicio:{" "}
                                        </span>{" "}
                                        {moment(campanas[selectedCampaign].fecha_inicio).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </p>
                                    <p>
                                        <span className="fw-bold text-primary">
                                            Cupos disponibles:{" "}
                                        </span>
                                        {campanas[selectedCampaign].cupos - campanas[selectedCampaign].personas_activas} de {campanas[selectedCampaign].cupos}
                                    </p>
                                    <p>
                                        <span className="fw-bold text-primary">
                                            Postulaciones activas:{" "}
                                        </span>
                                        {campanas[selectedCampaign].personas_activas || 0}
                                    </p>
                                    <p>
                                        <span className="fw-bold text-primary">
                                            Total de postulaciones:{" "}
                                        </span>
                                        {campanas[selectedCampaign].personas_postuladas || 0}
                                    </p>
                                    <p>
                                        <span className="fw-bold text-primary">Docente: </span>
                                        {
                                            docentes.find(
                                                (docente) =>
                                                    docente.id_usuario ==
                                                    campanas[selectedCampaign].id_docente
                                            )?.nombre
                                        }{" "}
                                        {
                                            docentes.find(
                                                (docente) =>
                                                    docente.id_usuario ==
                                                    campanas[selectedCampaign].id_docente
                                            )?.apellido
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowInfoModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
//SELECT COUNT(id_campaña) as cuenta FROM `postulacion` WHERE id_campaña = 6;
