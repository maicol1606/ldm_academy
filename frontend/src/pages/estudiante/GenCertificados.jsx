import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext.jsx";
import { useGetData, usePostData } from "../../lib/fetchData.js";
import generarCertificado from "../../lib/generarCertificado.js";

export default function CertificadoAdmin() {
    const [downloadable, setDownloadable] = useState(false);
    const [allowed, setAllowed] = useState(false);

    const { data: user, loading: loadingUser } = useAuth();

    const { data: asistencias, loading: loadingAsistencia } = useGetData(
        `/asistencia/mostrarAsistencias/${user?.id_usuario}`
    );

    useEffect(() => {
        if (!asistencias) return;

        if (asistencias.length == 0) {
            setAllowed(false);
            setDownloadable(false);
            return;
        }

        const horasHechas = asistencias.reduce((total, a) => total + a.horas, 0);

        const horasInvalidas = asistencias.reduce(
            (total, a) => (a.novedades ? total + a.horas : total),
            0
        );

        const horasTotales = 120 + horasInvalidas;
        console.log("Horas hechas:", horasHechas);
        console.log("Horas inválidas:", horasInvalidas);
        console.log("Horas totales requeridas:", horasTotales);
        if (horasHechas >= horasTotales) {
            setAllowed(true);
            setDownloadable(true);
        } else {
            setAllowed(false);
            setDownloadable(false);
        }
    }, [user, asistencias]);

    const handleCertificar = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const response = await usePostData(`/estudiantes/${user?.id_usuario}/certificar`, data);
        if (!response.success) return;

        const certificado = response.data;
        generarCertificado(user.nombre, user.apellido, certificado.certificacion_documento);
    };

    if (loadingUser || !asistencias || loadingAsistencia) {
        return <div>Cargando...</div>;
    }

    const horasHechas = asistencias.reduce((total, a) => total + a.horas, 0);
    const horasInvalidas = asistencias.reduce(
        (total, a) => (a.novedades ? total + a.horas : total),
        0
    );
    const horasTotales = 120 + horasInvalidas;

    return (
        <>
            <section className="w-100">
                <div
                    className="container-fluid d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "#002855",
                        height: "100vh",
                        width: "100%",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    {allowed ? (
                        <div>
                            <h1 className="fs-1 text-white mb-2">
                                ¡Felicidades! <br />
                                Has completado tus horas de servicio social
                            </h1>
                            <p className="fs-5 text-white">
                                Ya puedes descargar tu certificado de manera online, sin tener que
                                esperar en largas filas. Haz clic en el siguiente botón para
                                obtenerlo.
                            </p>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="btn btn-lg btn-primary mt-4"
                            >
                                Descargar certificado
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h1 className="fs-1 text-white mb-2">
                                Aún no has completado tus horas de servicio social
                            </h1>
                            <p className="fs-5 text-white">
                                Te faltan {horasTotales - horasHechas} horas por completar de las{" "}
                                {horasTotales} horas requeridas.
                            </p>
                            <p className="fs-5 text-white">
                                Continúa realizando tu servicio social para poder obtener tu
                                certificado.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <form onSubmit={handleCertificar}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Ingrese su número de identificación
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-warning mb-3" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    <strong>¡Importante!</strong> Por favor verifique cuidadosamente
                                    su número de identificación antes de continuar, ya que una vez
                                    generado el certificado, no podrá ser modificado.
                                </div>
                                <label htmlFor="identificacion">Número de identificación: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="certificacion_documento"
                                    id="identificacion"
                                    maxLength={12}
                                    placeholder="Número de identificación"
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Generar certificado
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
