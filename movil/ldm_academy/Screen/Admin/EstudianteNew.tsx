import React, { useState } from 'react';
import axios from 'axios';
import NavegacionAdmin from "./NavegacionAdmin";

const EstudianteNew = () => {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    curso: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.104.49:3000/api/auth/registar', user);

      if (response.status === 200) {
        alert('Estudiante creado exitosamente');
        window.location.href = '/EstudianteNew';
      } else {
        alert('Error al crear el estudiante');
      }
    } catch (error) {
      console.error(error);
      alert('Error al crear el estudiante');
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <NavegacionAdmin />
      <div className="container bg-white shadow p-4 rounded">
        <h2 className="text-center text-primary mb-4">Registro de Estudiante</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                pattern="^[A-Za-zÁ-ÿÑñ\s]+$"
                onChange={handleChange}
                className="form-control"
                placeholder='Nombre'
                name="nombre"
                required
                maxLength={27}
                value={user.nombre}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                pattern="^[A-Za-zÁ-ÿÑñ\s]+$"
                onChange={handleChange}
                className="form-control"
                placeholder='Apellido'
                name="apellido"
                required
                maxLength={40}
                value={user.apellido}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Curso</label>
              <input
                type="text"
                pattern="[0-9]{4}"
                onChange={handleChange}
                className="form-control"
                placeholder="Curso"
                name="curso"
                required
                maxLength={4}
                value={user.curso}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{6,}$"
                onChange={handleChange}
                className="form-control"
                placeholder="Correo"
                name="correo"
                required
                maxLength={40}
                value={user.correo}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                onChange={handleChange}
                className="form-control"
                placeholder="Contraseña"
                name="contrasena"
                required
                maxLength={20}
                value={user.contrasena}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                pattern="[0-9]{10}"
                onChange={handleChange}
                className="form-control"
                placeholder="Teléfono"
                name="telefono"
                required
                maxLength={10}
                value={user.telefono}
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="button" className="btn btn-secondary me-2">
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
