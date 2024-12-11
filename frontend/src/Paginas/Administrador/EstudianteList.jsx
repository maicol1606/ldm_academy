import React, { useState, useEffect } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
const EstudianteList = () => {
  const [usuarios, setUsuarios] = useState([]);
  
  // Simulamos la obtención de datos desde una API o base de datos
  useEffect(() => {
    // Aquí puedes hacer una llamada a una API para obtener los usuarios
    // Esto es solo un ejemplo con datos simulados.
    const fetchUsuarios = async () => {
      const data = [
        { id_usuario: 1, nombre: 'Juan', apellido: 'Pérez', correo: 'juan@example.com', telefono: '123456789', curso: 'Matemáticas' },
        { id_usuario: 2, nombre: 'Ana', apellido: 'García', correo: 'ana@example.com', telefono: '987654321', curso: 'Física' },
        // Agregar más usuarios según sea necesario
      ];
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (id) => {
    // Aquí puedes agregar la lógica para redirigir a una página de edición
    console.log(`Editar usuario con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Aquí puedes agregar la lógica para eliminar el usuario
    console.log(`Eliminar usuario con ID: ${id}`);
    setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id));  // Simula la eliminación
  };

  return (
    <div className="container-fluid">
        <NavegacionAdmin />
      <div className="table-responsive">
        <table className="table table-dark table-sm">
          <thead>
            <tr className="text-center roboto-medium">
              <th></th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Curso</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={usuario.id_usuario}>
                <td>{index + 1}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.curso}</td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleEdit(usuario.id_usuario)}>
                    Modificar
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(usuario.id_usuario)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
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

export default EstudianteList;
