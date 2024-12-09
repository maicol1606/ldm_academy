import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
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
        navigate('/Homepage'); // Redirige a la página "Homepage"
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h1 className="text-center">Iniciar Sesión</h1>
                <div className="form-group mb-3">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña"
                    />
                </div>
                <button className="btn btn-primary w-100 mb-3">Ingresar</button>
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
