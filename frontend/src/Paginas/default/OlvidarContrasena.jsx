import React from 'react'

export default function OlvidarContrasena() {
  return (
      <div>
          <div
              className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
              tabIndex="-1"
              role="dialog"
              id="modalSignin"
          >
              <div className="modal-dialog" role="document">
                  <div className="modal-content rounded-4 shadow">
                      <div className="modal-header p-5 pb-4 border-bottom-0">
                          <h1 className="fw-bold mb-0 fs-2">Recuperar Contraseña</h1>
                      </div>

                      <div className="modal-body p-5 pt-0">
                          <form>
                              <div className="form-floating mb-3">
                                  <input
                                      type="email"
                                      className="form-control rounded-3"
                                      id="floatingInput"
                                      placeholder="name@example.com"
                                  />
                                  <label htmlFor="floatingInput">Correo Electronico</label>
                              </div>
                              <button
                                  className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                  type="submit"
                              >
                                  Enviar
                              </button>
                              </form>
                      </div>
                  </div>
              </div>
          </div>
      </div> 
  )
}
                      
