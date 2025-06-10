import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/authContext";

export default function PostulacionesDocente() {
    const [postulaciones, setPostulaciones] = useState([]);
    console.log(postulaciones)
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const { data: user, loading: loadingUser } = useAuth();
    const id_user = user?.id_usuario;

    useEffect(() => {
        const obtenerPostulaciones = async () => {
            try {
                setIsDataUpdated(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/postulacion/mostrarPostulacionesPorDocente/${id_user}`
                );
                setPostulaciones(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerPostulaciones();
        setIsDataUpdated(false);
    }, [isDataUpdated, id_user]);

    const postulacionesPendientes = postulaciones.filter(
        (postulacion) => postulacion.estado_postulacion === "pendiente"
    );
    const postulacionesAceptadas = postulaciones.filter(
        (postulacion) => postulacion.estado_postulacion === "aceptada"
    );
    const postulacionesRechazadas = postulaciones.filter(
        (postulacion) => postulacion.estado_postulacion === "rechazada"
    );

    const handleAceptar = async (idPostulacion, correo) => {
        try {
            const confirm = await Swal.fire({
                title: "¿Desea aceptar la postulación?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, borrar",
            });
            if (!confirm.isConfirmed) {
                return;
            } else {
                const response = await axios.put(
                    `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/postulacion/aceptarPostulacion/${idPostulacion}`,
                    { correo }
                );
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Postulación aceptada",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsDataUpdated(true);
        }
    };

    const handleRechazar = async (idPostulacion, correo) => {
        try {
            const confirm = await Swal.fire({
                title: "¿Desea rechazar la postulación?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, borrar",
            });
            if (!confirm.isConfirmed) {
                return;
            } else {
                const response = await axios.put(
                    `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/postulacion/rechazarPostulacion/${idPostulacion}`,
                    { correo }
                );
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Postulación rechazada",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsDataUpdated(true);
        }
    };

    if (loadingUser) return <div>Cargando...</div>;

    return (
        <div className="d-flex">
            <div className="container">
                <h1 className="text-center display-1">Postulaciones</h1>
                <h1 className="text-center">Postulaciones pendientes</h1>
                <div className="row">
                    {postulacionesPendientes.length == 0 && <div className="text-center">No hay postulaciones pendientes</div>}
                    {postulacionesPendientes.map((postulacion) => (
                        <div className="col-md-4" key={postulacion.id_postulacion}>
                            <div className="card p-2 rounded d-flex align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <p>
                                        <strong>
                                            {postulacion.nombre} {postulacion.apellido}
                                        </strong>{" "}
                                        se ha postulado a <strong>{postulacion.nom_campaña}</strong>
                                    </p>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button
                                        onClick={() =>
                                            handleAceptar(
                                                postulacion.id_postulacion,
                                                postulacion.correo
                                            )
                                        }
                                        className="btn btn-primary me-3"
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleRechazar(
                                                postulacion.id_postulacion,
                                                postulacion.correo
                                            )
                                        }
                                        className="btn btn-danger"
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <h1 className="text-center">Postulaciones aceptadas</h1>
                    <div className="row">
                    {postulacionesAceptadas.length == 0 && <div className="text-center">No hay postulaciones pendientes</div>}
                        {postulacionesAceptadas.map((postulacion) => (
                            <div className="col-md-4" key={postulacion.id_postulacion}>
                                <div className="card p-2 rounded d-flex align-items-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <p>
                                            <strong>
                                                {postulacion.nombre} {postulacion.apellido}
                                            </strong>{" "}
                                            se ha postulado a{" "}
                                            <strong>
                                                {postulacion.nom_campaña}, ha sido aceptada
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row">
                    <h1 className="text-center">Postulaciones rechazadas</h1>
                    <div className="row">
                    {postulacionesRechazadas.length == 0 && <div className="text-center">No hay postulaciones pendientes</div>}
                        {postulacionesRechazadas.map((postulacion) => (
                            <div className="col-md-4" key={postulacion.id_postulacion}>
                                <div className="card p-2 rounded d-flex align-items-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <p>
                                            <strong>
                                                {postulacion.nombre} {postulacion.apellido}
                                            </strong>{" "}
                                            se ha postulado a{" "}
                                            <strong>
                                                {postulacion.nom_campaña}, ha sido rechazada
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
