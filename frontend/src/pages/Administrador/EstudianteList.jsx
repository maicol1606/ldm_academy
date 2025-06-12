import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EstudianteList = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const estudiantesPorPagina = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/estudiantes/llamarEstudiantes`
                );
                setEstudiantes(res.data);
            } catch (error) {
                console.error("Error al obtener estudiantes:", error);
            }
        };

        fetchEstudiantes();
    }, [trigger]);

    const eliminarEstudiante = async (id) => {
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
                    `${
                        import.meta.env.VITE_PUBLIC_API_DOMAIN
                    }/api/estudiantes/eliminarEstudiante/${id}`
                );
                if (res.status === 200) {
                    Swal.fire("Eliminado", "El estudiante fue eliminado.", "success").then(() => {
                        window.location.reload();
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Hubo un problema al eliminar.", "error");
        }
    };

    const handleEdit = (estudiante) => {
        setSelectedEstudiante(estudiante);
    };

    const handleUpdateEstudiante = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const response = await axios.put(
            import.meta.env.VITE_PUBLIC_API_DOMAIN +
                "/api/usuarios/" +
                selectedEstudiante.id_usuario,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status === 200) {
            Swal.fire({
                title: "Estudiante actualizado",
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

    const estudiantesFiltrados = estudiantes.filter((est) =>
        `${est.nombre} ${est.apellido} ${est.correo}`.toLowerCase().includes(filtro.toLowerCase())
    );

    const totalPaginas = Math.ceil(estudiantesFiltrados.length / estudiantesPorPagina);
    const inicio = (paginaActual - 1) * estudiantesPorPagina;
    const estudiantesPaginados = estudiantesFiltrados.slice(inicio, inicio + estudiantesPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    return (
        <>
            <div className="bg-blue min-vh-100">
                <div className="container py-5">
                    <h2 className="text-center mb-4">Listado de Estudiantes</h2>

                    <input
                        type="text"
                        className="form-control mb-2 radius-4"
                        placeholder="Buscar por nombre, apellido o correo..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />

                    <div className="row g-4">
                        {estudiantesPaginados.map((usuario) => (
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
                                        <p className="card-text">
                                            <strong>Curso:</strong> {usuario.curso}
                                        </p>
                                        <div className="d-flex justify-content-center gap-3">
                                            <button
                                                className="btn btn-outline-info btn-sm"
                                                onClick={() => handleEdit(usuario)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#editEstudianteModal"
                                            >
                                                <FaEdit /> Editar
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                    eliminarEstudiante(usuario.id_usuario)
                                                }
                                            >
                                                <FaTrash /> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {estudiantesFiltrados.length === 0 && (
                            <div className="text-center">No se encontraron estudiantes.</div>
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
                id="editEstudianteModal"
                tabIndex="-1"
                aria-labelledby="editEstudianteModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editEstudianteModalLabel">
                                Editar Estudiante
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {selectedEstudiante && (
                                <form
                                    onSubmit={handleUpdateEstudiante}
                                    id="editEstudianteForm"
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
                                            defaultValue={selectedEstudiante.nombre}
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
                                            defaultValue={selectedEstudiante.apellido}
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
                                            defaultValue={selectedEstudiante.correo}
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
                                            defaultValue={selectedEstudiante.telefono}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="curso" className="form-label">
                                            Curso
                                        </label>
                                        <input
                                            className="form-control"
                                            name="curso"
                                            type="text"
                                            id="curso"
                                            defaultValue={selectedEstudiante.curso}
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
                                form="editEstudianteForm"
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

export default EstudianteList;
