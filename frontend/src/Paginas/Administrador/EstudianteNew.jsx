import React, { useState } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
const EstudianteNew = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    curso: '',
    correo: '',
    contrasena: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al backend
    console.log('Formulario enviado:', formData);
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      apellido: '',
      curso: '',
      correo: '',
      contrasena: '',
      telefono: '',
    });
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
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required maxLength="27" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" name="apellido" value={formData.apellido} onChange={handleChange} required maxLength="40" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Curso</label>
              <select name="curso" className="form-select" value={formData.curso} onChange={handleChange} required>
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
              <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} required maxLength="40" />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" name="contrasena" value={formData.contrasena} onChange={handleChange} required maxLength="20" />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Teléfono</label>
              <input type="tel" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} required maxLength="15" />
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="button" className="btn btn-secondary me-2" onClick={handleReset}>
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

