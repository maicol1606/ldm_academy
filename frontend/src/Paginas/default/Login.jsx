import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showModal, setShowModal] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const navigate = useNavigate();

    //alerta de confirmación
    const handleRecoverClick = () => {
        if (window.confirm("¿Estás seguro de enviar el código?")) {
            setShowModal(true);  //ventana emergente para ingresar el código
        }
    };

    //envío del código 
    const handleSendCode = () => {
        setShowCodeInput(true);  //ingresar el código
    };

    //verificar el código ingresado
    const handleVerifyCode = () => {
        // Aquí se debería realizar la validación del código (esto es solo un ejemplo)
        if (code === "123456") {
            setIsCodeVerified(true);
            alert("¡Código verificado con éxito!");
            navigate('/campañas');  // Redirige a otra página
        } else {
            alert("Código incorrecto, por favor intente nuevamente.");
        }
    };

    return (
        <div
            className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
            tabIndex="-1"
            role="dialog"
            id="modalSignin"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Iniciar Sesión</h1>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Correo Electronico</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control rounded-3"
                                    id="floatingPassword"
                                    placeholder="Password"
                                />
                                <label htmlFor="floatingPassword">Contraseña</label>
                            </div>
                            <button
                                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                type="submit"
                            >
                                Ingresar
                            </button>
                            <small className="text-body-secondary">
                                ¿Olvidaste tu contraseña? 
                                <button type="button" className="btn btn-link p-0" onClick={handleRecoverClick}>
                                    Recuperar aquí
                                </button>
                            </small>
                            <hr className="my-4" />

                            {/* Ventana emergente para ingresar el código */}
                            {showModal && (
                                <div className="modal fade show d-block" id="recoverModal" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content rounded-4 shadow">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Recuperación de contraseña</h5>
                                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Se enviará un código a tu correo <strong>{email}</strong>.</p>
                                                <button className="btn btn-primary" onClick={handleSendCode}>Enviar código</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Ventana emergente para ingresar el código enviado al correo */}
                            {showCodeInput && (
                                <div className="modal fade show d-block" id="codeModal" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content rounded-4 shadow">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Ingresa el código enviado a tu correo</h5>
                                                <button type="button" className="btn-close" onClick={() => setShowCodeInput(false)}></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="codeInput"
                                                        placeholder="Código"
                                                        value={code}
                                                        onChange={(e) => setCode(e.target.value)}
                                                    />
                                                    <label htmlFor="codeInput">Código</label>
                                                </div>
                                                <button className="btn btn-success w-100" onClick={handleVerifyCode}>Verificar código</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
