import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/authContext";

import "../global.css";

export default function GuestLayout({ requiredRol, requiredGuest, requiredAuth }) {
    const { data: user, loading: loadingUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loadingUser) return;

        if (requiredAuth && !user) return navigate("/login");
        if (requiredGuest && user) return navigate("/");
        if (requiredRol && user.id_rol !== requiredRol) return navigate("/");
    }, [user, loadingUser]);

    return (
        <main className="w-100 d-flex" style={{ height: "100vh", overflow: "hidden" }}>
            <div className="p-4" style={{ width: "100%", height: "100vh", overflow: "auto" }}>
                <Outlet />
            </div>
        </main>
    );
}
