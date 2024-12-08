import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import NavegacionAdmin from '../../Componentes/NavegacionAdmin';
export default function InfoCampañas() {

  return (
    <div>import React from "react";
      <div>
        {<NavegacionAdmin />}
        {/* Main Section */}
        <main>
          <section className="py-5 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Campañas</h1>
                <p className="lead text-body-secondary">
                  El servicio social no es solo un requisito, es una oportunidad para marcar la diferencia.
                </p>
              </div>
            </div>
          </section>

          {/* Album Section */}
          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {[...Array(6)].map((_, index) => (
                  <div className="col" key={index}>
                    <div className="card shadow-sm">
                      <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="225"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c" />
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                          Postulate
                        </text>
                      </svg>
                      <div className="card-body">
                        <p className="card-text">
                          Descripción.
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">postularte</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">inicio</button>
                          </div>
                          <small className="text-body-secondary">9 cupos</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}


