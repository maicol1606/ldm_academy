import React, { useState, useEffect } from "react";

export default function HomeEstudiante() {
    const [campañas, setCampañas] = useState([]);
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [campanasRes, docentesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/campanas/mostrarCampanas`),
                    axios.get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/docentes/obtenerDocentes`),
                ]);
                setCampañas(campanasRes.data);
                setDocentes(docentesRes.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="d-flex">
            {/* Contenido principal */}
            <div className="container">
                <section id="perfil" className="text-center mt-5">
                    <div
                        className="service-social-header"
                        style={{
                            backgroundImage: "url(ruta-de-tu-imagen)",
                            backgroundSize: "cover",
                            height: "300px",
                        }}
                    >
                        <div className="overlay">
                            <h1 className="text-white">Servicio Social</h1>
                            <button className="btn btn-primary btn-lg">
                                Hacer Servicio Social
                            </button>
                        </div>
                    </div>
                </section>

                {/* Botón para ver personas realizando servicio social */}
                <section className="mt-4">
                    <button className="btn btn-info" onClick={handleModal}>
                        Ver cuántas personas se encuentran realizando servicio social
                    </button>
                </section>

                {/* Modal para mostrar las campañas */}
                {showModal && (
                    <div
                        className="modal show"
                        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Personas realizando servicio social
                                    </h5>
                                    <button type="button" className="close" onClick={handleModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Campaña</th>
                                                <th>Personas realizando servicio social</th>
                                                <th>Personas postuladas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(personasEnCampañas).map(
                                                (campaña, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {campaña.charAt(0).toUpperCase() +
                                                                campaña.slice(1)}
                                                        </td>
                                                        <td>{personasEnCampañas[campaña]}</td>
                                                        <td>{personasPostuladas[campaña]}</td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Campañas disponibles */}
                <section id="campañas" className="mt-5">
                    <h2>Campañas disponibles</h2>
                    <div className="row">
                        {[
                            {
                                nombre: "Comedor",
                                descripcion:
                                    "Las personas que hacen servicio social en comedor están pendientes de que los estudiantes obtengan comida y ayudan a repartir almuerzos.",
                                necesarias: 20,
                                postuladas: 15,
                            },
                            {
                                nombre: "Biblioteca",
                                descripcion:
                                    "Asisten en la organización de libros, tareas administrativas y apoyo a los usuarios de la biblioteca.",
                                necesarias: 10,
                                postuladas: 12,
                            },
                            {
                                nombre: "Enfermería",
                                descripcion:
                                    "Colaboran en la asistencia médica básica y apoyo a los pacientes en la enfermería.",
                                necesarias: 8,
                                postuladas: 10,
                            },
                            {
                                nombre: "Coordinación",
                                descripcion:
                                    "Apoyan en la organización y coordinación de actividades y eventos escolares.",
                                necesarias: 6,
                                postuladas: 8,
                            },
                            {
                                nombre: "Salón",
                                descripcion:
                                    "Asisten en las actividades de enseñanza, colaboran con los docentes y mantienen el orden en los salones de clase.",
                                necesarias: 12,
                                postuladas: 9,
                            },
                            {
                                nombre: "Orientación",
                                descripcion:
                                    "Brindan apoyo al orientador en tareas académicas y de bienestar de los estudiantes.",
                                necesarias: 7,
                                postuladas: 11,
                            },
                        ].map((campaña, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card shadow-sm" style={{ height: "100%" }}>
                                    <img
                                        src={`ruta-imagen-${campaña.nombre.toLowerCase()}`}
                                        alt={`Imagen de la campaña ${campaña.nombre}`}
                                        className="card-img-top"
                                        style={{ height: "150px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{campaña.nombre}</h5>
                                        <p className="card-text">{campaña.descripcion}</p>
                                        <hr />
                                        <p>
                                            <strong>Personas necesarias:</strong>{" "}
                                            {campaña.necesarias}
                                        </p>
                                        <p>
                                            <strong>Personas postuladas:</strong>{" "}
                                            {campaña.postuladas}
                                        </p>
                                        <button className="btn btn-success">Postularse</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
