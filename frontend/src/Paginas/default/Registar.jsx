import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function registar() {

  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    curso: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/registar', user);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: response.data.title,
          text: response.data.message,
        }).then(() => {
          window.location.href = '/login';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar el usuario',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: error.response.data.title,
        text: 'Error al registrar el usuario',
      });
    }
  }

  return (
    <div className="p-3 mb-2 bg- ">
      <div className=" ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card-body p-md-5">
              <div className="vh-100">
                <div className='w-100 w-sm-50 px-5 rounded'>
                  <div className='text-center my-3'>
                    <div className='d-flex justify-content-center'>
                      </div>
                    <h1 className='text-info'>Registrate Ahora</h1>
                    <p>Crea tu cuenta con nosotros</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input pattern="^[A-Za-zÁ-ÿÑñ\s]+$" type="text" onChange={handleChange} className="form-control " id="floatingInput" placeholder="nombre" name='nombre' required />
                      <label htmlFor="floatingInput"> <i className="bi bi-person"></i>&nbsp; Nombres</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input pattern="^[A-Za-zÁ-ÿÑñ\s]+$" type="text" onChange={handleChange} className="form-control" id="floatingInput" placeholder="apellido" name='apellido' required />
                      <label htmlFor="floatingInput"><i className="bi bi-person"></i>&nbsp; Apellidos</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{6,}$" type="email" onChange={handleChange} className="form-control " id="floatingInput" placeholder="correo" name='correo' required />
                      <label htmlFor="floatingInput"><i className="bi bi-envelope-at"></i>&nbsp; Correo</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="password" onChange={handleChange} className="form-control " id="floatingInput" placeholder="contrasena" name='contrasena' required />
                      <label htmlFor="floatingInput"><i className="bi bi-lock"></i>&nbsp; Contraseña</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input pattern="[0-9]{10}" type="int" onChange={handleChange} className="form-control " id="floatingInput" placeholder="telefono" name='telefono' required />
                      <label htmlFor="floatingInput"><i className="bi bi-telephone-plus"></i>&nbsp; Telefono</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input pattern="[0-9]{4}" type="int" onChange={handleChange} className="form-control " id="floatingInput" placeholder="curso" name='curso' required />
                      <label htmlFor="floatingInput"><i className="bi bi-backpack"></i>&nbsp; Curso</label> <br />
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-info w-50 rounded-4 mb-2 py-2 swal2 " type='submit'>Registrarse</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>






  )
}
