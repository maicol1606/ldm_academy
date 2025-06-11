import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaClock, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext.jsx";
import { useGetData } from "../../lib/fetchData.js";

export default function Horas() {
    const { data: user, loading: loadingUser } = useAuth();

    const { data: asistencias, loading: loadingAsistencia } = useGetData(
        `/asistencia/mostrarAsistencias/${user?.id_usuario}`
    );

    if (loadingUser || !asistencias || loadingAsistencia) {
        return <div>Cargando...</div>;
    }

    const horasHechas = asistencias.reduce((total, a) => total + (a.novedades ? 0 : a.horas), 0);
    const horasInvalidas = asistencias.reduce(
        (total, a) => (a.novedades ? total + a.horas : total),
        0
    );
    const horasTotales = 120 + horasInvalidas;

    return (
        <div className="d-flex">
            <div className="container">
                <section id="horas" className="mt-5">
                    <h2 className="text-center mb-4">Gestión de Horas de Servicio Social</h2>

                    <div className="row text-center mb-4">
                        <div className="col-md-4">
                            <div className="card p-3">
                                <FaRegClock size={30} className="mb-2" />
                                <h5>Total de Horas a realizar</h5>
                                <p>{horasTotales} horas</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3">
                                <FaClock size={30} className="mb-2" />
                                <h5>Horas Realizadas</h5>
                                <p>{horasHechas} horas</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3">
                                <FaRegCalendarAlt size={30} className="mb-2" />
                                <h5>Horas Extra</h5>
                                <p>{horasInvalidas} horas</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h4>Registro de Horas</h4>
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora de Inicio</th>
                                    <th>Hora de Fin</th>
                                    <th>Horas</th>
                                    <th>Novedades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asistencias.map((a, i) => (
                                    <tr key={i}>
                                        <td>{new Date(a.fecha).toLocaleDateString()}</td>
                                        <td>
                                            {new Date(
                                                `1970-01-01T${a.hora_inicio}`
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td>
                                            {new Date(
                                                `1970-01-01T${a.hora_fin}`
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td>{a.horas}</td>
                                        <td>{a.novedades || "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
