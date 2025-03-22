import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', user);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: response.data.title,
                    text: response.data.message,
                }).then(() => {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    const rol = response.data.rol;
                    switch (rol) {
                        case 1:
                            navigate('/admin');
                            break;
                        case 2:
                            navigate('/HomeEstudiante');
                            break;
                        case 3:
                            navigate('/HomeDocentes');
                            break;
                        default:
                            navigate('/');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al iniciar sesión',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: error.response.data.title,
                text: 'Error al iniciar sesión',
            });
        }
    }

    const navigate = useNavigate();

    // Redirigir al Homepage
    const handleBackToHome = () => {
        navigate('/'); // Redirige a la página "Homepage"
    };

    return (
        <div className="container mt-5" align="center">
            <div className="card shadow p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center">Iniciar Sesión</h1>
                    <div className="form-floating mb-3">
                        <input pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{6,}$" type="email" onChange={handleChange} className="form-control " id="floatingInput" placeholder="correo" name='correo' required />
                        <label htmlFor="floatingInput"><i className="bi bi-envelope-at"></i>&nbsp; Correo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={handleChange} className="form-control " id="floatingInput" placeholder="contrasena" name='contrasena' required />
                        <label htmlFor="floatingInput"><i className="bi bi-lock"></i>&nbsp; Contraseña</label>
                    </div>
                    <button className="btn btn-primary w-100 mb-3" type='submit'>Ingresar</button>
                    <Link
                        className="btn btn-link text-decoration-none"
                        to="/olvidarContrasena"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <p >¿Aun no tienes una cuenta? <a className='btn btn-link text-decoration-none' href="/registar">Registrate</a></p>

                    <button
                        className="btn btn-secondary w-100 mt-3"
                        onClick={handleBackToHome}
                    >
                        Volver a inicio
                    </button>
                    
                </form>
            </div>
        </div>
    );
}