import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function CrearCampaña() {
    const { data: user } = useAuth();
    const id_user = user.id_usuario;

    const [Campaña, setCampaña] = useState({
        nom_campana: "",
        descripcion: "",
        fecha: "",
        cupos: "",
        id_docente: id_user,
        foto: null,
    });

    const [preview, setPreview] = useState(null); // <- Imagen para mostrar previsualización
    const handleChange = (e) => {
        setCampaña({
            ...Campaña,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCampaña((prevCampaña) => ({
            ...prevCampaña,
            foto: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nom_campana", Campaña.nom_campana);
        formData.append("descripcion", Campaña.descripcion);
        formData.append("fecha", Campaña.fecha);
        formData.append("cupos", Campaña.cupos);
        formData.append("id_docente", Campaña.id_docente);
        formData.append("foto", Campaña.foto);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/campanas/agregarCampana`,
                formData
            );
            if (res.status === 200) {
                Swal.fire({
                    title: res.data.title,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });

                setCampaña({
                    nom_campana: "",
                    descripcion: "",
                    fecha: "",
                    cupos: "",
                    id_docente: id_user,
                    foto: null,
                });
            } else {
                Swal.fire({
                    title: "Error al crear la campaña",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: error.response.data.title,
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <div className="d-flex">
            <div className="container py-5 animate-fadeInUp">
                <div
                    className="card shadow-lg border-0 rounded-4 p-4 mx-auto bg-light"
                    style={{ maxWidth: "850px" }}
                >
                    <h2 className="text-center text-primary mb-4">
                        <i className="fas fa-bullhorn me-2"></i> Nueva Campaña
                    </h2>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">
                                    Nombre de la campaña
                                </label>
                                <input
                                    type="text"
                                    name="nom_campana"
                                    value={Campaña.nom_campana}
                                    className="form-control rounded-pill"
                                    onChange={handleChange}
                                    placeholder="Ingrese el nombre de la campaña"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">
                                    Número de cupos
                                </label>
                                <input
                                    type="number"
                                    name="cupos"
                                    value={Campaña.cupos}
                                    className="form-control rounded-pill"
                                    onChange={handleChange}
                                    placeholder="Ingrese el número de estudiantes"
                                    required
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label fw-bold text-primary">
                                    Descripción
                                </label>
                                <textarea
                                    name="descripcion"
                                    value={Campaña.descripcion}
                                    className="form-control rounded-4"
                                    onChange={handleChange}
                                    placeholder="Ingrese la descripción de la campaña"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">
                                    Fecha de inicio
                                </label>
                                <input
                                    type="date"
                                    name="fecha"
                                    value={Campaña.fecha}
                                    className="form-control rounded-pill"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">
                                    Foto de la campaña
                                </label>
                                <input
                                    type="file"
                                    name="foto"
                                    accept="image/*"
                                    className="form-control rounded-pill"
                                    onChange={handleFileChange}
                                />
                                {preview && (
                                    <div className="mt-3 text-center">
                                        <img
                                            src={preview}
                                            alt="Previsualización"
                                            className="img-fluid rounded-3 shadow-sm"
                                            style={{ maxHeight: "200px" }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button
                                type="reset"
                                className="btn btn-outline-secondary me-3 rounded-pill px-4"
                            >
                                <i className="fas fa-eraser me-2"></i> Limpiar
                            </button>
                            <button type="submit" className="btn btn-primary rounded-pill px-4">
                                <i className="fas fa-save me-2"></i> Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
