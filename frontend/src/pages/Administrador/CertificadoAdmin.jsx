import React, { useState, useEffect } from "react";
import { useGetData } from "../../lib/fetchData.js";
import generarCertificado from "../../lib/generarCertificado.js";
import { FaEye, FaFilePdf } from "react-icons/fa";

export default function CertificadoAdmin() {
    const [certificaciones, setCertificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: certificacionesData, loading: loadingCertificaciones } = useGetData(
        "/estudiantes/certificaciones"
    );

    useEffect(() => {
        if (certificacionesData) {
            setCertificaciones(certificacionesData);
            setLoading(false);
        }
    }, [certificacionesData]);

    const handleVerCertificado = (estudiante) => {
        generarCertificado(
            estudiante.nombre,
            estudiante.apellido,
            estudiante.certificacion_documento
        );
    };

    if (loading || loadingCertificaciones) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3" role="alert">
                Error al cargar las certificaciones: {error}
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Gestión de Certificaciones</h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Campaña</th>
                                    <th>Curso</th>
                                    <th>Documento</th>
                                    <th>Fecha de Certificación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificaciones.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No hay certificaciones registradas
                                        </td>
                                    </tr>
                                ) : (
                                    certificaciones.map((cert) => (
                                        <tr key={cert.id_certificacion}>
                                            <td>{cert.id_certificacion}</td>
                                            <td>
                                                {cert.nombre} {cert.apellido}
                                            </td>
                                            <td>{cert.nom_campaña}</td>
                                            <td>{cert.curso}</td>
                                            <td>{cert.certificacion_documento}</td>
                                            <td>
                                                {new Date(cert.certificacion_fecha).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm me-2"
                                                    onClick={() => handleVerCertificado(cert)}
                                                    title="Ver Certificado"
                                                >
                                                    <FaEye /> Ver
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
