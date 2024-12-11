import React, { useState } from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
export default function CampaignNew() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nueva campaña agregada:\nNombre: ${name}\nDescripción: ${description}`);
  };

  return (
    <div className="container-fluid">
      <NavegacionAdmin />
      <form className="form-neon" autoComplete="off">
        <fieldset>
          <legend>
            <i className="far fa-address-card"></i> &nbsp; Información de la campaña
          </legend>
          <div className="container-fluid">
            <div className="row"></div>
          </div>
        </fieldset>

        <br /><br /><br />

        <fieldset>
          <legend>
            <i className="fas fa-user-lock"></i> &nbsp; ID de la campaña
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

              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="descripcion_campana" className="bmd-label-floating">
                    Descripción de la campaña
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion_campana"
                    id="descripcion_campana"
                    maxLength="200"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <br /><br /><br />

        <fieldset>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <select className="form-control" name="usuario_privilegio">
                    <option value="" selected disabled>
                      Seleccione el lugar a donde va a pertenecer
                    </option>
                    <option value="1">Coordinación</option>
                    <option value="2">Salón</option>
                    <option value="3">Comedor</option>
                    <option value="4">Orientación</option>
                    <option value="5">Biblioteca</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <p className="text-center" style={{ marginTop: '40px' }}>
          <button type="reset" className="btn btn-secondary btn-sm">
            <i className="fas fa-paint-roller"></i> &nbsp; LIMPIAR
          </button>
          &nbsp; &nbsp;
          <button type="submit" className="btn btn-info btn-sm" id="btn_mañana">
            <i className="far fa-save"></i> &nbsp; GUARDAR
          </button>
        </p>
      </form>
    </div>
  );
};
