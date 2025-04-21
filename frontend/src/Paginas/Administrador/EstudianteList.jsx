import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './App.css';

const EstudianteList = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const estudiantesPorPagina = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/estudiantes/llamarEstudiantes');
        setEstudiantes(res.data);
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    };

    fetchEstudiantes();
  }, []);

  const eliminarEstudiante = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      });

      if (confirm.isConfirmed) {
        const res = await axios.delete(`http://localhost:3000/api/estudiantes/eliminarEstudiante/${id}`);
        if (res.status === 200) {
          Swal.fire('Eliminado', 'El estudiante fue eliminado.', 'success').then(() => {
            window.location.reload();
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Hubo un problema al eliminar.', 'error');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editar-estudiante/${id}`);
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
    <div className="bg-blue  min-vh-100">
      <NavegacionAdmin />
      <div className="container py-5">
        <h2 className="text-center mb-4">Listado de Estudiantes</h2>

        <input
          type="text"
          className="form-control  mb-2 radius-4 "
          placeholder="Buscar por nombre, apellido o correo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <div className="row g-4">
          {estudiantesPaginados.map((usuario) => (
            <div key={usuario.id_usuario} className="col-md-6 col-lg-4">
              <div className="card student-card h-100 shadow-lg border-0">
                <div className="card-body text-center">
                  <h5 className="card-title">{usuario.nombre} {usuario.apellido}</h5>
                  <p className="card-text"><strong>Correo:</strong> {usuario.correo}</p>
                  <p className="card-text"><strong>Teléfono:</strong> {usuario.telefono}</p>
                  <p className="card-text"><strong>Curso:</strong> {usuario.curso}</p>
                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-info btn-sm" onClick={() => handleEdit(usuario.id_usuario)}>
                      <FaEdit /> Editar
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarEstudiante(usuario.id_usuario)}>
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {estudiantesFiltrados.length === 0 && (
            <div className="text-center text-">No se encontraron estudiantes.</div>
          )}
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline- mx-2" onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
              ← Anterior
            </button>
            <span className="align-self-center mx-2">Página {paginaActual} de {totalPaginas}</span>
            <button className="btn btn-outline- mx-2" onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstudianteList;