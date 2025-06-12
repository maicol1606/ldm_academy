import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DocenteList = () => {
    const [docentes, setDocentes] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [selectedDocente, setSelectedDocente] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const docentesPorPagina = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/docentes/obtenerDocentes`
                );
                setDocentes(res.data);
            } catch (error) {
                console.error("Error al obtener docentes:", error);
            }
        };

        fetchDocentes();
    }, [trigger]);

    const eliminarDocente = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1e40af",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
            });

            if (confirm.isConfirmed) {
                const res = await axios.delete(
                    `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/docentes/eliminarDocente/${id}`
                );
                if (res.status === 200) {
                    Swal.fire("Eliminado", "El docente fue eliminado.", "success").then(() => {
                        setTrigger((prev) => prev + 1);
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Hubo un problema al eliminar.", "error");
        }
    };

    const handleEdit = (docente) => {
        setSelectedDocente(docente);
    };

    const handleUpdateDocente = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const response = await axios.put(
            import.meta.env.VITE_PUBLIC_API_DOMAIN +
                "/api/usuarios/" +
                selectedDocente.id_usuario,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status === 200) {
            Swal.fire({
                title: "Docente actualizado",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                setTrigger((prev) => prev + 1);
            });
        } else {
            Swal.fire({
                title: "Error",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    const docentesFiltrados = docentes.filter((doc) =>
        `${doc.nombre} ${doc.apellido} ${doc.correo}`.toLowerCase().includes(filtro.toLowerCase())
    );

    const totalPaginas = Math.ceil(docentesFiltrados.length / docentesPorPagina);
    const inicio = (paginaActual - 1) * docentesPorPagina;
    const docentesPaginados = docentesFiltrados.slice(inicio, inicio + docentesPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    return (
        <>
            <div className="bg-blue min-vh-100">
                <div className="container py-5">
                    <h2 className="text-center mb-4">Listado de Docentes</h2>

                    <input
                        type="text"
                        className="form-control mb-2 radius-4"
                        placeholder="Buscar por nombre, apellido o correo..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />

                    <div className="row g-4">
                        {docentesPaginados.map((usuario) => (
                            <div key={usuario.id_usuario} className="col-md-6 col-lg-4">
                                <div className="card student-card h-100 shadow-lg border-0">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">
                                            {usuario.nombre} {usuario.apellido}
                                        </h5>
                                        <p className="card-text">
                                            <strong>Correo:</strong> {usuario.correo}
                                        </p>
                                        <p className="card-text">
                                            <strong>Teléfono:</strong> {usuario.telefono}
                                        </p>
                                        <div className="d-flex justify-content-center gap-3">
                                            <button
                                                className="btn btn-outline-info btn-sm"
                                                onClick={() => handleEdit(usuario)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#editDocenteModal"
                                            >
                                                <FaEdit /> Editar
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => eliminarDocente(usuario.id_usuario)}
                                            >
                                                <FaTrash /> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {docentesFiltrados.length === 0 && (
                            <div className="text-center">No se encontraron docentes.</div>
                        )}
                    </div>

                    {/* Paginación */}
                    {totalPaginas > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                className="btn btn-outline-primary mx-2"
                                onClick={() => cambiarPagina(paginaActual - 1)}
                                disabled={paginaActual === 1}
                            >
                                ← Anterior
                            </button>
                            <span className="align-self-center mx-2">
                                Página {paginaActual} de {totalPaginas}
                            </span>
                            <button
                                className="btn btn-outline-primary mx-2"
                                onClick={() => cambiarPagina(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <div
                className="modal fade"
                id="editDocenteModal"
                tabIndex="-1"
                aria-labelledby="editDocenteModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editDocenteModalLabel">
                                Editar Docente
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {selectedDocente && (
                                <form
                                    onSubmit={handleUpdateDocente}
                                    id="editDocenteForm"
                                    encType="multipart/form-data"
                                >
                                    {/* <div className="mb-3">
                                        <label htmlFor="foto" className="form-label">
                                            Foto
                                        </label>
                                        <input
                                            className="form-control"
                                            name="foto"
                                            type="file"
                                            id="foto"
                                            accept="image/*"
                                        />
                                    </div> */}
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">
                                            Nombre
                                        </label>
                                        <input
                                            className="form-control"
                                            name="nombre"
                                            type="text"
                                            id="nombre"
                                            defaultValue={selectedDocente.nombre}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">
                                            Apellido
                                        </label>
                                        <input
                                            className="form-control"
                                            name="apellido"
                                            type="text"
                                            id="apellido"
                                            defaultValue={selectedDocente.apellido}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="correo" className="form-label">
                                            Correo electrónico
                                        </label>
                                        <input
                                            className="form-control"
                                            name="correo"
                                            type="email"
                                            id="correo"
                                            defaultValue={selectedDocente.correo}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">
                                            Teléfono
                                        </label>
                                        <input
                                            className="form-control"
                                            name="telefono"
                                            type="tel"
                                            id="telefono"
                                            defaultValue={selectedDocente.telefono}
                                        />
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                form="editDocenteForm"
                                className="btn btn-primary"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DocenteList;
