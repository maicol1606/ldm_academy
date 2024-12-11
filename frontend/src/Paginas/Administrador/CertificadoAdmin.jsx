import React from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";

const CertificadoAdmin = () => {
  return (
    <div className="container-fluid">
        <NavegacionAdmin />
      <form action="" className="form-neon" autoComplete="off">
        <fieldset>
          <legend>
            <i className="far fa-building"></i> &nbsp;Datos de certificación
          </legend>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="id_certificado" className="bmd-label-floating">
                    ID único de certificación
                  </label>
                  <input
                    type="text"
                    pattern="[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]{1,70}"
                    className="form-control"
                    name="id_certificado"
                    id="id_certificado"
                    maxLength="70"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="id_asisitencia" className="bmd-label-floating">
                    ID único de asistencia
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="id_asisitencia"
                    id="id_asisitencia"
                    maxLength="70"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="id_observación" className="bmd-label-floating">
                    Observaciones de la certificación
                  </label>
                  <input
                    type="text"
                    pattern="[0-9()+]{1,20}"
                    className="form-control"
                    name="id_observación"
                    id="id_observación"
                    maxLength="20"
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
          <button type="reset" className="btn btn-raised btn-secondary btn-sm">
            <i className="fas fa-paint-roller"></i> &nbsp; LIMPIAR
          </button>
          <button type="submit" className="btn btn-raised btn-success btn-sm" id="btn_azul">
            <i className="fas fa-sync-alt"></i> &nbsp; GENERAR
          </button>
        </p>
      </form>
    </div>
  );
};

export default CertificadoAdmin;
