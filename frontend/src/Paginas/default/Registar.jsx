import React from 'react'
import axios from 'axios'

export default function registar() {
  return (
    <div class="p-3 mb-2 bg-info-subtle text-info-emphasis">
        <div className="col-6 md-5 ">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card-body p-md-5">
                        <div className="vh-100">
                            <div className='w-100 w-sm-50 px-5 rounded'>
                                <div className='text-center my-3'>
                                    <div className='d-flex justify-content-center'>
                                <img src="" className="ml-6" alt="..."/></div>
            <h1 className='text-info'>Registrate Ahora</h1>
            <p>Crea tu cuenta con nosotros</p>
            </div>
            <div className="form-floating mb-3">
            <input type="text" className="form-control " id="floatingInput" placeholder="nombre" name='nombre'  required />
            <label htmlFor="floatingInput"> <i className="bi bi-person"></i>&nbsp; Nombres</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="apellido" name='apellido'  required />
            <label htmlFor="floatingInput"><i className="bi bi-person"></i>&nbsp; Apellidos</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control " id="floatingInput" placeholder="correo" name='correo'  required />
            <label htmlFor="floatingInput"><i className="bi bi-envelope-at"></i>&nbsp; Correo</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control " id="floatingInput" placeholder="contrasena" name='contrasena'  required />
            <label htmlFor="floatingInput"><i class="bi bi-lock"></i>&nbsp; Contraseña</label>
          </div>
          <div className="form-floating mb-3">
            <input type="int" className="form-control " id="floatingInput" placeholder="telefono" name='telefono'  required />
            <label htmlFor="floatingInput"><i class="bi bi-telephone-plus"></i>&nbsp; Telefono</label>
          </div>
          <div className="form-floating mb-3">
            <input type="int" className="form-control " id="floatingInput" placeholder="curso" name='curso'  required />
            <label htmlFor="floatingInput"><i class="bi bi-backpack"></i>&nbsp; Curso</label> <br />
           <div className="d-flex justify-content-center"> <button className="btn btn-info w-50 rounded-4 mb-2 py-2 swal2  " type='submit'>Registrarse</button>
           
           </div> 
          </div>
        </div>
    </div>
    </div>
    
            </div>
          </div>
        </div>
    </div>
    

    

  
  
  )
}
