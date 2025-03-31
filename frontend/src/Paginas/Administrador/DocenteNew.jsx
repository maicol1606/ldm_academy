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
    usuario_clave_2: "",
    usuario_rol: "",
    usuario_salon: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (rol) => {
    setFormData({ ...formData, usuario_rol: rol, usuario_salon: "" });
  };

  const handleSalonChange = (salon) => {
    setFormData({ ...formData, usuario_salon: salon });
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
    <div className="container py-4">
      <NavegacionAdmin />
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Registrar Docente</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_dni" value={formData.usuario_dni} onChange={handleChange} placeholder="Número de Identificación" />
                <label>Número de Identificación</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_nombre" value={formData.usuario_nombre} onChange={handleChange} placeholder="Nombres" />
                <label>Nombres</label>
              </div>
            </div>
          </div>
          
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_apellido" value={formData.usuario_apellido} onChange={handleChange} placeholder="Apellidos" />
                <label>Apellidos</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="usuario_telefono" value={formData.usuario_telefono} onChange={handleChange} placeholder="Teléfono" />
                <label>Teléfono</label>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <h4 className="mb-3">Rol a asignar</h4>
            <div className="row text-center">
              {['Salón', 'Comedor', 'Enfermería', 'Coordinación', 'Orientación', 'Biblioteca'].map((rol) => (
                <div className="col-6 col-md-4 mb-3" key={rol}>
                  <button type="button" className={`btn btn-outline-primary w-100 p-3 ${formData.usuario_rol === rol ? 'active' : ''}`} onClick={() => handleRoleChange(rol)}>
                    {rol}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {formData.usuario_rol === 'Salón' && (
            <div className="mt-3">
              <h4 className="mb-3">Seleccione el Salón</h4>
              <div className="row text-center">
                {[101, 102, 201, 202, 301, 302, 401, 402, 501, 502].map((salon) => (
                  <div className="col-4 col-md-3 mb-2" key={salon}>
                    <button type="button" className={`btn btn-outline-secondary w-100 ${formData.usuario_salon === salon ? 'active' : ''}`} onClick={() => handleSalonChange(salon)}>
                      {salon}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3">
            <h4 className="mb-3">Información de la Cuenta</h4>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="usuario_usuario" value={formData.usuario_usuario} onChange={handleChange} placeholder="Nombre de usuario" />
              <label>Nombre de usuario</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" name="usuario_email" value={formData.usuario_email} onChange={handleChange} placeholder="Email" />
              <label>Email</label>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="password" className="form-control" name="usuario_clave_1" value={formData.usuario_clave_1} onChange={handleChange} placeholder="Contraseña" />
                  <label>Contraseña</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="password" className="form-control" name="usuario_clave_2" value={formData.usuario_clave_2} onChange={handleChange} placeholder="Repetir contraseña" />
                  <label>Repetir contraseña</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button type="reset" className="btn btn-secondary me-3">LIMPIAR</button>
            <button type="submit" className="btn btn-info">GUARDAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocenteNew;
