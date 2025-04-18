import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importamos iconos para mejorar visualmente
import Swal from 'sweetalert2';


const EstudianteList = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/estudiantes/llamarEstudiantes');
        setEstudiantes(res.data); // usa los datos de la BD
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    };

    fetchEstudiantes();
  }, []);

  const eliminarEstudiante = async (id) => {
    try {
          const confirm = await Swal.fire({
            title: '¿Estás seguro de borrar al estudiante?',
            text: "No podrás revertir esta operación",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar'
          });
          if (confirm.isConfirmed) {
            const res = await axios.delete(`http://localhost:3000/api/estudiantes/eliminarEstudiante/${id}`);
            if (res.status === 200) {
              Swal.fire({
                title: 'Estudiante borrado',
                text: 'El estudiante ha sido borrado',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                navigate(0);
              })
            }
          }
        } catch (error) {
          console.log(error);
          Swal.fire('Error', 'Error al eliminar al estudiante', 'error');
        }
      };

  const handleEdit = (id) => {
    // Aquí puedes agregar la lógica para redirigir a una página de edición
    console.log(`Editar usuario con ID: ${id}`);
  };



  return (
    <div className="container-fluid p-4">
      <NavegacionAdmin />
      <div className="table-responsive">
        <h3 className=''>Listado de estudiantes en plataforma</h3>
        <table className="table table-hover table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Curso</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((usuario, index) => (
              <tr key={usuario.id_usuario} className="align-middle">
                <td>{index + 1}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.curso}</td>
                <td>
                  <button type="button" className="btn btn-outline-success btn-sm" onClick={() => handleEdit(usuario.id_usuario)}>
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => eliminarEstudiante(usuario.id_usuario)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstudianteList;