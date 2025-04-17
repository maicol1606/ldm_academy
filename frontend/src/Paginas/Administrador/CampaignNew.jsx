import React, { useState } from "react";
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CampaignNew() {
  const token = localStorage.getItem('token');
  const id_user = JSON.parse(atob(token.split(".")[1])).id;

  const [Campaña, setCampaña] = useState({
    nom_campana: '',
    descripcion: '',
    fecha: '',
    cupos: '',
    id_docente: id_user,
    foto: null
  });
  console.log(Campaña);
  const handleChange = (e) => {
    setCampaña({
      ...Campaña,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCampaña((prevCampaña) => ({
      ...prevCampaña,
      foto: file
    }));
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom_campana', Campaña.nom_campana);
    formData.append('descripcion', Campaña.descripcion);
    formData.append('fecha', Campaña.fecha);
    formData.append('cupos', Campaña.cupos);
    formData.append('id_docente', Campaña.id_docente);
    formData.append('foto', Campaña.foto);

    try{ 
      const res= await axios.post('http://localhost:3000/api/campanas/agregarCampana', formData);
      if(res.status === 200){
        Swal.fire({
          title: res.data.title,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        setCampaña({
          nom_campana: '',
          descripcion: '',
          fecha: '',
          cupos: '',
          id_docente: id_user,
          foto: null
        });

      }else{
        Swal.fire({
          title: 'Error al crear la campaña',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: error.response.data.title, 
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <NavegacionAdmin />
      <div className="container mt-4 ">
        <div className="card shadow-lg p-4">
          <h2 className="text-center text-primary mb-4">
            <i className="far fa-address-card"></i> &nbsp; Nueva Campaña
          </h2>
          <form onSubmit={handleSubmit} className='p-5'>
          <div className="form-group">
            <label htmlFor="nombreCampaña">Nombre de la campaña</label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="nombreCampaña"
              name='nom_campana'
              value={Campaña.nom_campana}

              placeholder="Ingrese el nombre de la campaña"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numEstudiantes">Número de cupos</label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              id="numEstudiantes"
              name='cupos'
              value={Campaña.cupos}

              placeholder="Ingrese el número de estudiantes"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descrpcion">Descripcion de la campaña</label>
            <textarea
              onChange={handleChange}
              className="form-control"
              id="descrpcion"
              name='descripcion'
              rows="3"
              value={Campaña.descripcion}
              placeholder="Ingrese la descripción"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha de Inicio</label>
            <input
              onChange={handleChange}
              type="date"
              className="form-control"
              id="fecha"
              name='fecha'
              value={Campaña.fecha}

              placeholder="Ingrese la fecha"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fotoCampaña">Subir foto de la campaña</label>
            <input
              type="file"
              className="form-control-file"
              id="fotoCampaña"
              name='foto'

              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Crear Campaña
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
