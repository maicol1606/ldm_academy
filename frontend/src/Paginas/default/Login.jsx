import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

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
                    text: 'Error al registrar el usuario',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: error.response.data.title,
                text: 'Error al registrar el usuario',
            });
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });
    const navigate = useNavigate();

    // Alerta de confirmación para enviar el código
    const handleRecoverClick = () => {
        if (window.confirm("¿Estás seguro de enviar el código a tu correo?")) {
            setShowModal(true);
        }
    };

    // Enviar el código y mostrar una alerta
    const handleSendCode = () => {
        setShowModal(false);
        setToast({ visible: true, message: 'Código enviado a tu correo.', type: 'info' });
        setTimeout(() => setShowCodeInput(true), 1000); // Mostrar input del código después de 1 segundo
    };

    // Verificar el código ingresado
    const handleVerifyCode = () => {
        if (code === "123456") {
            setToast({ visible: true, message: '¡Código verificado con éxito!', type: 'success' });
            // Mostrar la alerta antes de redirigir
            setTimeout(() => {
                if (window.confirm("Código verificado correctamente. ¿Quieres continuar?")) {
                    navigate('/campañas'); // Redirigir después de 1 segundo
                }
            }, 1000);
        } else {
            setToast({ visible: true, message: 'Código incorrecto, por favor intente nuevamente.', type: 'danger' });
            // Mostrar la alerta antes de redirigir
            setTimeout(() => {
                window.alert("El código ingresado no es correcto. Intenta nuevamente.");
            }, 1000);
        }
    };

    // Redirigir al Homepage
    const handleBackToHome = () => {
        navigate('/'); // Redirige a la página "Homepage"
    };

    return (
        <div className="container mt-5">
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
                    <button
                        className="btn btn-link text-decoration-none"
                        onClick={handleRecoverClick}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>

                    {/* Botón para volver al Homepage */}
                    <button
                        className="btn btn-secondary w-100 mt-3"
                        onClick={handleBackToHome}
                    >
                        Volver a inicio
                    </button>
                </form>

                {/* Modal para confirmar envío */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backdropFilter: 'blur(5px)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded-3 shadow-lg">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title">Confirmar acción</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p>¿Estás seguro de enviar el código a tu correo?</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancelar
                                    </button>
                                    <button className="btn btn-primary" onClick={handleSendCode}>
                                        Enviar código
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para ingresar el código enviado al correo */}
                {showCodeInput && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backdropFilter: 'blur(5px)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded-3 shadow-lg">
                                <div className="modal-header bg-info text-white">
                                    <h5 className="modal-title">Ingresa el código</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowCodeInput(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>Se ha enviado un código a tu correo <strong>{email}</strong>.</p>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Código"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <button className="btn btn-info w-100" onClick={handleVerifyCode}>
                                        Verificar código
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast Notifications */}
                {toast.visible && (
                    <div
                        className={`toast align-items-center text-bg-${toast.type} border-0 position-fixed bottom-0 end-0 m-3`}
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                    >
                        <div className="d-flex">
                            <div className="toast-body">
                                {toast.message}
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setToast({ visible: false, message: '', type: '' })}
                            ></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}