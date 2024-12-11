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
    <div className="container-fluid">
        <NavegacionAdmin />
      <form className="form-neon" autoComplete="off" onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <i className="fas fa-user"></i> &nbsp; Información básica
          </legend>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="bmd-label-floating">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    maxLength="27"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="bmd-label-floating">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    maxLength="40"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="bmd-label-floating">Curso</label>
                  <select
                    name="curso"
                    className="form-control"
                    value={formData.curso}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Curso...
                    </option>
                    <option value="901">901</option>
                    <option value="902">902</option>
                    <option value="1001">1001</option>
                    <option value="1002">1002</option>
                    <option value="1101">1101</option>
                    <option value="1102">1102</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="bmd-label-floating">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    maxLength="40"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="bmd-label-floating">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                    maxLength="20"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="bmd-label-floating">Telefono</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    maxLength="150"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <br />
        <br />
        <br />
        <p className="text-center" style={{ marginTop: '40px' }}>
          <button
            type="button"
            className="btn btn-raised btn-secondary btn-sm"
            onClick={handleReset}
          >
            <i className="fas fa-paint-roller"></i> &nbsp; LIMPIAR
          </button>
          &nbsp; &nbsp;
          <button type="submit" className="btn btn-raised btn-info btn-sm">
            <i className="far fa-save"></i> &nbsp; GUARDAR
          </button>
        </p>
      </form>
    </div>
  );
};

export default EstudianteNew;
