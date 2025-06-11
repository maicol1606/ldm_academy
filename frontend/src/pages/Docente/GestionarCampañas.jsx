import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const GestionarCampañas = () => {
  const [campañas, setCampañas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [CampañaEdit, setCampañaEdit] = useState({
    id_campaña: '',
    nom_campaña: '',
    descripcion: '',
    fecha: '',
    cupos: '',
    id_docente: '',
    foto: null,
  });

  const handleChangeEdit = (e) => {
    setCampañaEdit({
      ...CampañaEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChangeEdit = (e) => {
    const file = e.target.files[0];
    setCampañaEdit((prevCampaña) => ({
      ...prevCampaña,
      foto: file,
    }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campanasRes, docentesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/campanas/mostrarCampanas`),
          axios.get(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/docentes/obtenerDocentes`),
        ]);
        setCampañas(campanasRes.data.data);
        setDocentes(docentesRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/campanas/actualizarCampana/${CampañaEdit.id_campaña}`, CampañaEdit);
      if (res.status === 200) {
        Swal.fire({
          title: 'Campaña actualizada',
          text: 'La campaña ha sido actualizada',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate(0);
        })
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al actualizar la campaña', 'error');
    }
  };


  const eliminarCampaña = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estás seguro de borrar esta campaña?',
        text: "No podrás revertir esta operación",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
      });
      if (confirm.isConfirmed) {
        const res = await axios.delete(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/campanas/eliminarCampana/${id}`);
        if (res.status === 200) {
          Swal.fire({
            title: 'Campaña borrada',
            text: 'La campaña ha sido borrada',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            navigate(0);
          })
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al eliminar la campaña', 'error');
    }
  };

  return (
    <div className="d-flex">
      {/* Contenido principal */}
      <div className="container justify-content-center p-5">
        <h2 className="text-center mb-4">Gestionar Campañas</h2>

        {/* Botón para abrir el formulario */}
        <Link to="/crearCampaña" className="btn btn-primary mb-4">Agregar Nueva Campaña</Link>

        {/* Tabla de campañas */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
              <th>Fecha</th>
              <th>Docente</th>
            </tr>
          </thead>
          <tbody>
            {campañas.map((campaña) => (
              <tr key={campaña.id_campaña}>
                <td><img width={100} height={100} className="rounded-3" src={`/img/campañas/${campaña.imagen}`} alt="" /></td>
                <td>{campaña.nom_campaña}</td>
                <td>{campaña.descripcion}</td>
                <td>{campaña.cupos}</td>
                <td>{moment(campaña.fecha).format('DD/MM/YYYY')}</td>
                <td>{docentes.find(docente => docente.id_usuario === campaña.id_docente)?.nombre} {docentes.find(docente => docente.id_usuario === campaña.id_docente)?.apellido}</td>
                <td>

                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setCampañaEdit(campaña)}>
                    Editar
                  </button>

                  <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarCampaña(campaña.id_campaña)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmitEdit} className='p-5'>

              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Campaña</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div className="form-group">
                  <label htmlFor="nombreCampaña">Nombre de la campaña</label>
                  <input
                    onChange={handleChangeEdit}
                    type="text"
                    className="form-control"
                    id="nombreCampaña"
                    name='nom_campaña'
                    value={CampañaEdit.nom_campaña}

                    placeholder="Ingrese el nombre de la campaña"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numEstudiantes">Número de cupos</label>
                  <input
                    onChange={handleChangeEdit}
                    type="number"
                    className="form-control"
                    id="numEstudiantes"
                    name='cupos'
                    value={CampañaEdit.cupos}

                    placeholder="Ingrese el número de estudiantes"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descrpcion">Descripcion de la campaña</label>
                  <textarea
                    onChange={handleChangeEdit}
                    className="form-control"
                    id="descrpcion"
                    name='descripcion'
                    rows="3"
                    value={CampañaEdit.descripcion}
                    placeholder="Ingrese la descripción"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="fecha">Fecha de Inicio</label>
                  <input
                    onChange={handleChangeEdit}
                    type="date"
                    className="form-control"
                    id="fecha"
                    name='fecha'
                    value={moment(CampañaEdit.fecha).format('YYYY-MM-DD')}

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
                    onChange={handleFileChangeEdit}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit " class="btn btn-primary">Guardar</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionarCampañas;
