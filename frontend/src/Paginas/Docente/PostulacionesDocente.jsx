import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavegacionAdmin from '../../Componentes/NavegacionAdmin'
import NavegadorDocente from '../../Componentes/NavegadorDocente'
import Swal from 'sweetalert2'


export default function PostulacionesDocente() {

    const [postulaciones, setPostulaciones] = useState([])
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const token = localStorage.getItem('token')
    const decoded_token = token ? JSON.parse(atob(token.split('.')[1])) : null
    const idDocente = decoded_token.id

    useEffect(() => {
        const obtenerPostulaciones = async () => {
            try {
                setIsDataUpdated(true)
                const response = await axios.get(`http://localhost:3000/api/postulacion/mostrarPostulacionesPorDocente/${idDocente}`)
                setPostulaciones(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPostulaciones()
        setIsDataUpdated(false)
    }, [isDataUpdated, idDocente])

    const postulacionesPendientes = postulaciones.filter((postulacion) => postulacion.estado_postulacion === 'pendiente')
    const postulacionesAceptadas = postulaciones.filter((postulacion) => postulacion.estado_postulacion === 'aceptada')
    const postulacionesRechazadas = postulaciones.filter((postulacion) => postulacion.estado_postulacion === 'rechazada')

    const handleAceptar = async (idPostulacion, correo) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Desea aceptar la postulación?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar'
            });
            if (!confirm.isConfirmed) {
                return;
            }
            else{
                const response = await axios.put(`http://localhost:3000/api/postulacion/aceptarPostulacion/${idPostulacion}`, { correo })
                console.log(response)
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Postulación aceptada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsDataUpdated(true)
        }
    }

    const handleRechazar = async (idPostulacion, correo) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Desea rechazar la postulación?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar'
            });
            if (!confirm.isConfirmed) {
                return;
            }
            else {
                const response = await axios.put(`http://localhost:3000/api/postulacion/rechazarPostulacion/${idPostulacion}`, { correo })
                console.log(response)
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Postulación rechazada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsDataUpdated(true)
        }
    }


    return (
        <div className="d-flex">
            <NavegadorDocente/>
            <div className='container'>
                <h1 className='text-center'>Postulaciones</h1>
                <h1 className='text-center'>Postulaciones pendientes</h1>
                <div className='row'>
                    {postulacionesPendientes.map((postulacion) => (
                        <div className='col-md-4' key={postulacion.id_postulacion}>
                            <div className='card p-2 rounded d-flex align-items-center'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <p><strong>{postulacion.nombre} {postulacion.apellido}</strong> se ha postulado a <strong>{postulacion.nom_campaña}</strong></p>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={() => handleAceptar(postulacion.id_postulacion, postulacion.correo)} className='btn btn-primary me-3'>Aceptar</button>
                                    <button onClick={() => handleRechazar(postulacion.id_postulacion, postulacion.correo)} className='btn btn-danger'>Rechazar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='row'>
                    <h1 className='text-center'>Postulaciones aceptadas</h1>
                    <div className='row'>
                        {postulacionesAceptadas.map((postulacion) => (
                            <div className='col-md-4' key={postulacion.id_postulacion}>
                                <div className='card p-2 rounded d-flex align-items-center'>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <p><strong>{postulacion.nombre} {postulacion.apellido}</strong> se ha postulado a <strong>{postulacion.nom_campaña}, ha sido aceptada</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='row'>
                    <h1 className='text-center'>Postulaciones rechazadas</h1>
                    <div className='row'>
                        {postulacionesRechazadas.map((postulacion) => (
                            <div className='col-md-4' key={postulacion.id_postulacion}>
                                <div className='card p-2 rounded d-flex align-items-center'>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <p><strong>{postulacion.nombre} {postulacion.apellido}</strong> se ha postulado a <strong>{postulacion.nom_campaña}, ha sido rechazada</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
