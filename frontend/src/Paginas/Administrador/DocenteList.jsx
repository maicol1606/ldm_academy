import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importamos iconos para mejorar visualmente
import Swal from 'sweetalert2';

const DocenteList = () => {
  const [usuarios, setUsuarios] = useState([]);
  
  // Simulamos la obtención de datos desde una API o base de datos
  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = [
        { id_usuario: 1, nombre: 'Juan', apellido: 'Pérez', correo: 'juan@example.com', telefono: '123456789', curso: 'Matemáticas' },
        { id_usuario: 2, nombre: 'Ana', apellido: 'García', correo: 'ana@example.com', telefono: '987654321', curso: 'Física' },
      ];
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleEdit = (id) => {
    console.log(`Editar usuario con ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminar usuario con ID: ${id}`);
    setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id));
  };

  return (
    <div className="container-fluid p-4">
      <NavegacionAdmin />
      <div className="table-responsive">
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
            {usuarios.map((usuario, index) => (
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
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(usuario.id_usuario)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Paginación">
        <ul className="pagination justify-content-center mt-3">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">Anterior</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Siguiente</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DocenteList;
