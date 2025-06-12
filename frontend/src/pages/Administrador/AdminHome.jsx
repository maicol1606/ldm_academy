import React, { useEffect, useState } from "react";
import { useGetData } from "../../lib/fetchData.js";
import axios from "axios";

const EstadisticasDashboard = () => {
    const [datos, setDatos] = useState({
        total: 0,
        finalizados: 0,
        enProceso: 0,
        postulados: 0,
    });

    const {
        data: estudiantes,
        loading: loadingEstudiantes,
        reload: reloadEstudiantes,
    } = useGetData("/estudiantes/obtenerEstudiantes");

    useEffect(() => {
        // Cargar estadísticas
        axios
            .get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/obtenerEstadisticas`)
            .then((res) => setDatos(res.data))
            .catch((err) => {
                console.error("Error al cargar estadísticas:", err);
            });
    }, []);

    return (
        <div className=" ">
            <div className="container mt-5">
                <h2 className="text-center mb-4">Panel de Estadísticas</h2>

                <div className="row">
                    <div className="col-md-3">
                        <div className="card bg-card-blue mb-3">
                            <div className="card-header text-center font-weight-bold">
                                Total de Estudiantes
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">{datos.total}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card bg-success mb-3">
                            <div className="card-header text-center font-weight-bold">
                                Finalizados
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">{datos.finalizados}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card bg-warning text-dark mb-3">
                            <div className="card-header text-center font-weight-bold">
                                En Proceso
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">{datos.enProceso}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card bg-info text-dark mb-3">
                            <div className="card-header text-center font-weight-bold">
                                Postulaciones
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">{datos.postulados}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-center mb-4">Lista de Estudiantes</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Curso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((usuario, index) => (
                                <tr key={usuario.id_usuario}>
                                    <td>{index + 1}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.correo}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.curso}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasDashboard;
