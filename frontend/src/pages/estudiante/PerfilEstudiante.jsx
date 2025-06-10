import React, { useEffect, useState } from "react";
import axios from "axios";

const PerfilEstudiante = () => {
    const [estudiante, setEstudiante] = useState(null);

    useEffect(() => {
        const fetchEstudiante = async () => {
            try {
                const id = localStorage.getItem("id_usuario"); // o de tu auth
                const res = await axios.get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/estudiantes/${id}`);
                setEstudiante(res.data);
            } catch (error) {
                console.error("Error al obtener perfil del estudiante:", error);
            }
        };

        fetchEstudiante();
    }, []);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-body">
                            {estudiante ? (
                                <div className="row">
                                    <div className="col-md-4 text-center">
                                        <img
                                            src={
                                                estudiante.foto || "https://via.placeholder.com/150"
                                            }
                                            alt="Foto del Estudiante"
                                            className="img-fluid rounded-circle mb-3"
                                        />
                                        <button className="btn btn-primary">Editar Foto</button>
                                    </div>
                                    <div className="col-md-8">
                                        <h3>{estudiante.nombre}</h3>
                                        <p>
                                            <strong>Correo:</strong> {estudiante.correo}
                                        </p>
                                        <p>
                                            <strong>Matrícula:</strong> {estudiante.id_usuario}
                                        </p>
                                        <button className="btn btn-secondary mt-3">
                                            Editar Perfil
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>Cargando datos del estudiante...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilEstudiante;
