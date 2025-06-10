import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "../global.css";

// Contexts
import { useAuth } from "../contexts/authContext";

// Components
import Navegacion from "../Componentes/Navegacion";

export default function AppLayout({ requiredRol = false, requiredGuest = false, requiredAuth = false }) {
    const { data: user, loading: loadingUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loadingUser) return;

        if (requiredAuth && !user) return navigate("/login");
        if (requiredGuest && user) return navigate("/");
        if (requiredRol && user.id_rol !== requiredRol) return navigate("/");
    }, [user, loadingUser]);

    return (
        <div className="w-100 d-flex" style={{ height: "100vh", overflow: "hidden" }}>
            <Navegacion />
            <main style={{ width: "100%", height: "100vh", overflow: "auto" }}>
                <Outlet />
            </main>
        </div>
    );
}
