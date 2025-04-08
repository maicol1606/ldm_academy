import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
const EstudianteNew = () => {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    curso: ''
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
      const response = await axios.post('http://localhost:3000/api/auth/registar', user);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: response.data.title,
          text: response.data.message,
        }).then(() => {
          window.location.href = '/EstudianteNew';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear el estudiante',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: error.response.data.title,
        text: 'Error al crear el estudiante',
      });
    }
  }

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <NavegacionAdmin />
      <div className="container bg-white shadow p-4 rounded">
        <h2 className="text-center text-primary mb-4">Registro de Estudiante</h2>
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
            <div className="col-md-6 mb-3">
              <label className="form-label">Curso</label>
              <select pattern="[0-9]{4}" type="int" name="curso" className="form-select" onChange={handleChange} placeholder='curso' required>
                <option value="" disabled>Selecciona un curso...</option>
                <option value="901">901</option>
                <option value="902">902</option>
                <option value="1001">1001</option>
                <option value="1002">1002</option>
                <option value="1101">1101</option>
                <option value="1102">1102</option>
              </select>
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

export default EstudianteNew;

