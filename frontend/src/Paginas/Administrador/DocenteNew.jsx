import React, { useState } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import axios from 'axios';
import Swal from 'sweetalert2';

const DocenteNew = () => {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
   
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/docentes/agregarDocente', user);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: response.data.title,
          text: response.data.message,
        }).then(() => {
          window.location.href = '/DocenteNew';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear el Docente',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: error.response.data.title,
        text: 'Error al crear el Docente',
      });
    }
  }

  return (
    <div className="container py-4">
      <NavegacionAdmin />
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Registrar Docente</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>

<div className="row">
  <div className="col-md-6 mb-3">
    <label className="form-label">Nombre</label>
    <input pattern="^[A-Za-zÁ-ÿÑñ\s]+$" type="text" onChange={handleChange} className="form-control" placeholder='nombre' name="nombre"  required maxLength="27" />
  </div>
  <div className="col-md-6 mb-3">
    <label className="form-label">Apellido</label>
    <input pattern='^[A-Za-zÁ-ÿÑñ\s]+$' type="text" onChange={handleChange} className="form-control" placeholder='apellido' name="apellido"  required maxLength="40" />
  </div>
 
  <div className="col-md-4 mb-3">
    <label className="form-label">Correo</label>
    <input pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{6,}$" type="email"  onChange={handleChange} className="form-control" placeholder="correo" name='correo'  required maxLength="40" />
  </div>
  <div className="col-md-4 mb-3">
    <label className="form-label">Contraseña</label>
    <input type="password" onChange={handleChange} className="form-control"  placeholder="contrasena" name='contrasena'  required maxLength="20" />
  </div>
  <div className="col-md-4 mb-3">
    <label className="form-label">Teléfono</label>
    <input pattern="[0-9]{10}" type="int" onChange={handleChange} className="form-control" placeholder="telefono" name='telefono'  required maxLength="15" />
  </div>
</div>
<div className="text-center mt-4">
  <button type="button" className="btn btn-secondary me-2" >
    <i className="fas fa-paint-roller"></i> Limpiar
  </button>
  <button type="submit" className="btn btn-primary">
    <i className="far fa-save"></i> Guardar
  </button>
</div>
</form>
      </div>
    </div>
  );
};

export default DocenteNew;
