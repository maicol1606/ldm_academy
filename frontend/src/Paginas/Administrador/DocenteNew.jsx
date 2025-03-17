import React, { useState } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";

const DocenteNew = () => {
  const [formData, setFormData] = useState({
    usuario_dni: "",
    usuario_nombre: "",
    usuario_apellido: "",
    usuario_telefono: "",
    usuario_direccion: "",
    usuario_usuario: "",
    usuario_email: "",
    usuario_clave_1: "",
    usuario_clave_2: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.usuario_clave_1 !== formData.usuario_clave_2) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Formulario enviado", formData);
  };

  return (
    <div className="container-fluid p-4">
      <NavegacionAdmin />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Registrar Nuevo Docente</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_dni" id="usuario_dni" value={formData.usuario_dni} onChange={handleChange} maxLength="20" placeholder="Número de Identificación" />
                <label htmlFor="usuario_dni">Número de Identificación</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_nombre" id="usuario_nombre" value={formData.usuario_nombre} onChange={handleChange} maxLength="35" placeholder="Nombres" />
                <label htmlFor="usuario_nombre">Nombres</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_apellido" id="usuario_apellido" value={formData.usuario_apellido} onChange={handleChange} maxLength="35" placeholder="Apellidos" />
                <label htmlFor="usuario_apellido">Apellidos</label>
              </div>
            </div>
          </div>
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_telefono" id="usuario_telefono" value={formData.usuario_telefono} onChange={handleChange} maxLength="20" placeholder="Teléfono" />
                <label htmlFor="usuario_telefono">Teléfono</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_direccion" id="usuario_direccion" value={formData.usuario_direccion} onChange={handleChange} maxLength="190" placeholder="Dirección" />
                <label htmlFor="usuario_direccion">Dirección</label>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <h4 className="mb-3">Información de la Cuenta</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_usuario" id="usuario_usuario" value={formData.usuario_usuario} onChange={handleChange} maxLength="35" placeholder="Nombre de usuario" />
                <label htmlFor="usuario_usuario">Nombre de usuario</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input type="email" className="form-control" name="usuario_email" id="usuario_email" value={formData.usuario_email} onChange={handleChange} maxLength="70" placeholder="Email" />
                <label htmlFor="usuario_email">Email</label>
              </div>
            </div>
          </div>
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input type="password" className="form-control" name="usuario_clave_1" id="usuario_clave_1" value={formData.usuario_clave_1} onChange={handleChange} maxLength="200" placeholder="Contraseña" />
                <label htmlFor="usuario_clave_1">Contraseña</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input type="password" className="form-control" name="usuario_clave_2" id="usuario_clave_2" value={formData.usuario_clave_2} onChange={handleChange} maxLength="200" placeholder="Repetir contraseña" />
                <label htmlFor="usuario_clave_2">Repetir contraseña</label>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="reset" className="btn btn-secondary btn-lg shadow-sm me-3">
              <i className="fas fa-paint-roller"></i> &nbsp; LIMPIAR
            </button>
            <button type="submit" className="btn btn-info btn-lg shadow-sm">
              <i className="far fa-save"></i> &nbsp; GUARDAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocenteNew;
