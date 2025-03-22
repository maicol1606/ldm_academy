import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Recuperar() {

    const [user, setUser] = useState({
        correo: localStorage.getItem('correo'),
        codigo: '',
        contrasena: '',
        confirmarContrasena: ''
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)  => {
        e.preventDefault()
        try {
            if (user.contrasena !== user.confirmarContrasena) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Las contraseñas no coinciden',
                })
                return
            }
            const res = await axios.put(`http://localhost:3000/api/auth/recuperar`, user)
            console.log(user)
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Contraseña actualizada con éxito',
                }).then(() => {
                    window.location.href = '/login'
                })
            } 
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
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
                                            type="text"
                                            className="form-control rounded-3"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            onChange={handleChange}
                                            name="codigo"
                                        />
                                        <label htmlFor="floatingInput">Codigo</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control rounded-3"
                                            id="floatingInput"
                                            placeholder="Contraseña"
                                            onChange={handleChange}
                                            name='confirmarContrasena'
                                        />
                                        <label htmlFor="floatingInput">Contraseña</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control rounded-3"
                                            id="floatingInput"
                                            placeholder="Confirmar contraseña"
                                            onChange={handleChange}
                                            name='contrasena'
                                        />
                                        <label htmlFor="floatingInput">Nueva Contraseña</label>
                                    </div>
                                    <button
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
        </div>
    )
}