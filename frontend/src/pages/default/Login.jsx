import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Hooks
import { usePostData } from "../../lib/fetchData.js";
import { useAuth } from "../../contexts/authContext.jsx";

export default function Login() {
    const { data: user, loading: loadingUser, reload: reloadUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const response = await usePostData("/auth/login", data);
        if (!response.success) return;

        const token = response.data.token;
        const rol = response.data.rol;

        localStorage.setItem("auth_token", token);

        reloadUser();

        switch (rol) {
            case 1:
                navigate("/dashboard/admin");
                break;
            case 2:
                navigate("/dashboard/estudiante");
                break;
            case 3:
                navigate("/dashboard/docente");
                break;
            default:
                navigate("/");
                break;
        }
    };

    if (loadingUser) return <div>Cargando...</div>;

    return (
        <div className="container mt-5" align="center">
            <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center">Iniciar Sesión</h1>
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
                    <button className="btn btn-primary w-100 mb-3" type="submit">
                        Ingresar
                    </button>
                    <Link className="btn btn-link text-decoration-none" to="/olvidarContrasena">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <p>
                        ¿Aun no tienes una cuenta?{" "}
                        <a className="btn btn-link text-decoration-none" href="/register">
                            Registrate
                        </a>
                    </p>

                    <button className="btn btn-secondary w-100 mt-3" onClick={() => navigate("/")}>
                        Volver a inicio
                    </button>
                </form>
            </div>
        </div>
    );
}
