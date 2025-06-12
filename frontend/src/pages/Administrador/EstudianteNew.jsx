import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { usePostData } from "../../lib/fetchData";

const EstudianteNew = () => {
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
        telefono: "",
        curso: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            contrasena: user.contrasena,
            confirmarContrasena: user.confirmarContrasena,
            telefono: user.telefono,
            curso: user.curso,
            estado: 1,
        };

        const response = await usePostData("/usuarios", data);

        if (!response.success) return;
        e.target.reset();
    };

    return (
        <div className="bg-estudiante">
            <div className="container py-5 animate-fadeInUp">
                <div
                    className="card shadow-lg border-0 rounded-4 p-4 mx-auto bg-light"
                    style={{ maxWidth: "900px" }}
                >
                    <h2 className="text-center text-primary mb-4">Registro de Estudiante</h2>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    pattern="^[A-Za-zÁ-ÿÑñ\s]+$"
                                    maxLength="27"
                                    className="form-control rounded-pill"
                                    onChange={handleChange}
                                    placeholder="Ingrese el nombre"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">Apellido</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    pattern="^[A-Za-zÁ-ÿÑñ\s]+$"
                                    maxLength="40"
                                    className="form-control rounded-pill"
                                    onChange={handleChange}
                                    placeholder="Ingrese el apellido"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">Curso</label>
                                <select
                                    name="curso"
                                    className="form-select rounded-pill"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un curso...</option>
                                    <option value="901">901</option>
                                    <option value="902">902</option>
                                    <option value="1001">1001</option>
                                    <option value="1002">1002</option>
                                    <option value="1101">1101</option>
                                    <option value="1102">1102</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="correo"
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{6,}$"
                                    className="form-control rounded-pill"
                                    maxLength="40"
                                    onChange={handleChange}
                                    placeholder="ejemplo@correo.com"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">Teléfono</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    className="form-control rounded-pill"
                                    onChange={handleChange}
                                    placeholder="Ingrese el número"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="contrasena"
                                    maxLength="20"
                                    className="form-control rounded-pill"
                                    onChange={handleChange}
                                    placeholder="Ingrese una contraseña segura"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-primary">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="confirmarContrasena"
                                    maxLength="20"
                                    className={`form-control rounded-pill ${
                                        user.confirmarContrasena
                                            ? user.confirmarContrasena === user.contrasena
                                                ? "is-valid"
                                                : "is-invalid"
                                            : ""
                                    }`}
                                    onChange={handleChange}
                                    placeholder="Repita la contraseña"
                                    required
                                />
                                {user.confirmarContrasena &&
                                    user.confirmarContrasena !== user.contrasena && (
                                        <div className="invalid-feedback">
                                            Las contraseñas no coinciden.
                                        </div>
                                    )}
                                {user.confirmarContrasena &&
                                    user.confirmarContrasena === user.contrasena && (
                                        <div className="valid-feedback">
                                            Las contraseñas coinciden.
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
};

export default EstudianteNew;
