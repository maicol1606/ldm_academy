import React from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";

const CertificadoAdmin = () => {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <NavegacionAdmin />
      <div className="d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4 mt-4 w-75">
          <h2 className="text-center text-primary mb-4">
            <i className="fas fa-certificate"></i> Generar Certificación
          </h2>
          <form className="form-neon" autoComplete="off">
            <fieldset>
              <legend className="text-secondary">
                <i className="far fa-file-alt"></i> &nbsp; Datos de certificación
              </legend>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-id-badge"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      name="id_certificado"
                      id="id_certificado"
                      placeholder="ID único de certificación"
                      maxLength="70"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-user-check"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      name="id_asistencia"
                      id="id_asistencia"
                      placeholder="ID único de asistencia"
                      maxLength="70"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-comment-dots"></i></span>
                    <textarea
                      className="form-control"
                      name="observaciones"
                      id="observaciones"
                      placeholder="Observaciones de la certificación"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="text-center mt-4">
              <button type="reset" className="btn btn-outline-secondary mx-2">
                <i className="fas fa-paint-roller"></i> LIMPIAR
              </button>
              <button type="submit" className="btn btn-primary mx-2">
                <i className="fas fa-file-download"></i> GENERAR CERTIFICADO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificadoAdmin;
