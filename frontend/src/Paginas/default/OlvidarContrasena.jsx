import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

export default function OlvidarContrasena() {

    const [correo, setCorreo] = useState('')

    const handleChange = (e) => {
        setCorreo(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/api/auth/enviarCodigo', {correo: correo})
            console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Correo Enviado',
                    text: 'Revise su correo electronico',
                }).then(() => {
                    Navigate('/Recuperar')
                    localStorage.setItem('correo', correo)
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
            })
            console.log(error)
        }
    }

    return (
        <div>
            <div
                className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
                tabIndex="-1"
                role="dialog"
                id="modalSignin"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">Recuperar Contraseña</h1>
                        </div>

                        <div className="modal-body p-5 pt-0">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control rounded-3"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingInput">Correo Electronico</label>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                    type="submit"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

