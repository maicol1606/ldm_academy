import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function RutaPrivada ({ requiredRol }) {
    const [isAuth, setIsAuth] = useState(null);
    const [userRol, setUserRol] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const validarToken = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const res = await axios.get(`http://localhost:3000/api/auth/validarToken`, config);
                setIsAuth(true);
                setUserRol(res.data.rol);
            } catch (err) {
                console.error(err);
                setIsAuth(false);
                localStorage.removeItem('token');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Su sesión ha expirado. Por favor, inicia sesión de nuevo.',
                })
            }
        };


        if (token) {
            validarToken();
        } else {
            setIsAuth(false);
        }
    }, [token]);

    if (isAuth === null) {
        return <div></div>;
    }

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    if (requiredRol && userRol !== requiredRol) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};