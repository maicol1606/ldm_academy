import React from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import { usePostData } from "../../lib/fetchData";

export default function registar() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const response = await usePostData("/usuarios", data);
        if (!response.success) return;

        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <h1 className="text-center">Registrate Ahora</h1>
                <p className="text-center">
                    Crea tu cuenta con nosotros y empieza tu servicio social:*
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            pattern="^[A-Za-zÁ-ÿÑñ\s]+$"
                            type="text"
                            className="form-control "
                            id="floatingInput"
                            placeholder="nombre"
                            name="nombre"
                            required
                        />
                        <label htmlFor="floatingInput">
                            {" "}
                            <i className="bi bi-person"></i>&nbsp; Nombres
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            pattern="^[A-Za-zÁ-ÿÑñ\s]+$"
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="apellido"
                            name="apellido"
                            required
                        />
                        <label htmlFor="floatingInput">
                            <i className="bi bi-person"></i>&nbsp; Apellidos
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{6,}$"
                            type="email"
                            className="form-control "
                            id="floatingInput"
                            placeholder="correo"
                            name="correo"
                            required
                        />
                        <label htmlFor="floatingInput">
                            <i className="bi bi-envelope-at"></i>&nbsp; Correo
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control "
                            id="floatingInput"
                            placeholder="contrasena"
                            name="contrasena"
                            required
                        />
                        <label htmlFor="floatingInput">
                            <i className="bi bi-lock"></i>&nbsp; Contraseña
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            pattern="[0-9]{10}"
                            type="int"
                            className="form-control "
                            id="floatingInput"
                            placeholder="telefono"
                            name="telefono"
                            required
                        />
                        <label htmlFor="floatingInput">
                            <i className="bi bi-telephone-plus"></i>&nbsp; Telefono
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            pattern="[0-9]{4}"
                            type="int"
                            className="form-control "
                            id="floatingInput"
                            placeholder="curso"
                            name="curso"
                            required
                        />
                        <label htmlFor="floatingInput">
                            <i className="bi bi-backpack"></i>&nbsp; Curso
                        </label>{" "}
                        <br />
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary w-100 mt-3 " type="submit">
                                Registrarse
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
