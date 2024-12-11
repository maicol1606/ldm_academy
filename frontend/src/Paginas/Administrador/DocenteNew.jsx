import React from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
const DocenteNew = () => {
  return (
    <div className="container-fluid">
        <NavegacionAdmin />
      <form className="form-neon" autoComplete="off">
        {/* Información personal */}
        <fieldset>
          <legend>
            <i className="far fa-address-card"></i> &nbsp; Información personal
          </legend>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="usuario_dni" className="bmd-label-floating">
                    Número de Identificación
                  </label>
                  <input
                    type="text"
                    pattern="[0-9-]{1,20}"
                    className="form-control"
                    name="usuario_dni"
                    id="usuario_dni"
                    maxLength="20"
                  />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="usuario_nombre" className="bmd-label-floating">
                    Nombres
                  </label>
                  <input
                    type="text"
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,35}"
                    className="form-control"
                    name="usuario_nombre"
                    id="usuario_nombre"
                    maxLength="35"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="usuario_apellido" className="bmd-label-floating">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,35}"
                    className="form-control"
                    name="usuario_apellido"
                    id="usuario_apellido"
                    maxLength="35"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="usuario_telefono" className="bmd-label-floating">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    pattern="[0-9()+]{1,20}"
                    className="form-control"
                    name="usuario_telefono"
                    id="usuario_telefono"
                    maxLength="20"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="usuario_direccion" className="bmd-label-floating">
                    Dirección
                  </label>
                  <input
                    type="text"
                    pattern="[a-zA-Z0-99áéíóúÁÉÍÓÚñÑ()# ]{1,190}"
                    className="form-control"
                    name="usuario_direccion"
                    id="usuario_direccion"
                    maxLength="190"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <br /><br /><br />

        {/* Información de la cuenta */}
        <fieldset>
          <legend>
            <i className="fas fa-user-lock"></i> &nbsp; Información de la cuenta
          </legend>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="usuario_usuario" className="bmd-label-floating">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    pattern="[a-zA-Z0-9]{1,35}"
                    className="form-control"
                    name="usuario_usuario"
                    id="usuario_usuario"
                    maxLength="35"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="usuario_email" className="bmd-label-floating">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="usuario_email"
                    id="usuario_email"
                    maxLength="70"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="usuario_clave_1" className="bmd-label-floating">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="usuario_clave_1"
                    id="usuario_clave_1"
                    maxLength="200"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="usuario_clave_2" className="bmd-label-floating">
                    Repetir contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="usuario_clave_2"
                    id="usuario_clave_2"
                    maxLength="200"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <br /><br /><br />

        <p className="text-center" style={{ marginTop: '40px' }}>
          <button type="reset" className="btn btn-raised btn-secondary btn-sm">
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

export default DocenteNew;
