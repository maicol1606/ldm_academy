import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaSignInAlt, FaHome } from 'react-icons/fa';

export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [showModal, setShowModal] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });
    const navigate = useNavigate();

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
            const response = await axios.post('/login', user);
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
                            navigate('/admin/home');
                            break;
                        case 2:
                            navigate('/HomeEstudiante');
                            break;
                        case 3:
                            navigate('/homeDocentes');
                            break;
                        default:
                            navigate('/homepage');
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

    const handleForgotPassword = () => {
        Swal.fire({
            title: '¿Olvidaste tu contraseña?',
            text: 'Se enviará un código a tu correo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                setEmail(user.email);
                setShowModal(false);
                setToast({ visible: true, message: 'Código enviado a tu correo.', type: 'info' });
                setTimeout(() => setShowCodeInput(true), 1000);
            }
        });
    }

    const handleVerifyCode = () => {
        if (code === "123456") {
            setToast({ visible: true, message: '¡Código verificado con éxito!', type: 'success' });
            setTimeout(() => {
                setShowCodeInput(false);
                setShowModal(true);
            }, 1000);
        } else {
            setToast({ visible: true, message: 'Código incorrecto, por favor intente nuevamente.', type: 'danger' });
        }
    };

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseñas no coinciden',
                text: 'Por favor, asegúrese de que las contraseñas coincidan.',
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada con éxito',
                text: 'Tu contraseña ha sido actualizada. Puedes iniciar sesión.',
            }).then(() => {
                navigate('/HomeEstudiante'); 
            });
        }
    };

    return (
        <div className="container-fluid" style={{ background: 'linear-gradient(to right, #4CAF50, #2196F3)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Iniciar Sesión</h1>
                    <div className="form-floating mb-3">
                        <input type="email" onChange={handleChange} className="form-control" id="floatingInput" placeholder="correo" name="email" required />
                        <label htmlFor="floatingInput"><i className="bi bi-envelope-at"></i>&nbsp; Correo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={handleChange} className="form-control" id="floatingInput" placeholder="contrasena" name="password" required />
                        <label htmlFor="floatingInput"><i className="bi bi-lock"></i>&nbsp; Contraseña</label>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                            <FaSignInAlt /> Ingresar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleForgotPassword}>
                            ¿Olvidaste tu contraseña?
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
                            <FaHome /> Volver al inicio
                        </button>
                    </div>
                </form>

                {showCodeInput && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backdropFilter: 'blur(5px)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded-3 shadow-lg">
                                <div className="modal-header bg-info text-white">
                                    <h5 className="modal-title">Ingresa el código</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowCodeInput(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Se ha enviado un código a tu correo <strong>{email}</strong>.</p>
                                    <input type="text" className="form-control mb-3" placeholder="Código" value={code} onChange={(e) => setCode(e.target.value)} />
                                    <button className="btn btn-info w-100" onClick={handleVerifyCode}>Verificar código</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showModal && !showCodeInput && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backdropFilter: 'blur(5px)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded-3 shadow-lg">
                                <div className="modal-header bg-warning text-white">
                                    <h5 className="modal-title">Ingresa tu nueva contraseña</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <input type="password" className="form-control mb-3" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <input type="password" className="form-control mb-3" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <button className="btn btn-warning w-100" onClick={handleUpdatePassword}>Actualizar contraseña</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {toast.visible && (
                    <div className={`toast align-items-center text-bg-${toast.type} border-0 position-fixed bottom-0 end-0 m-3`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">{toast.message}</div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({ visible: false, message: '', type: '' })}></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
