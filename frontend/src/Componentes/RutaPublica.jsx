import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';




export default function RutaPublica() {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    

    const token = localStorage.getItem('token');

    useEffect(() => {
        const rolToken = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const res = await axios.get(`http://localhost:3000/api/auth/validarToken`, config);
                setUserRole(res.data.rol);
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Su sesión ha expirado. Por favor, inicia sesión de nuevo.',
                });
            }
            finally {
                setIsLoading(false);
            }
        };

        if (token) {
            rolToken();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    if (isLoading) {
        return <div className='text-center vh-100 display-1 align-center'>Cargando...</div>;
    }

    

    if (userRole) {
        switch (userRole) {
            case 1:
                return <Navigate to="/admin/" />;
            case 2:
                return <Navigate to="/HomeEstudiante/" />;
            case 3:
                return <Navigate to="/HomeDocentes/" />;
            default:
                return <Navigate to="/Login/" />;
        }
    }

    return <Outlet />;
}