import React, { useState, useEffect } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const GestionarCampañas = () => {
  const [campañas, setCampañas] = useState([]);
  const [docentes, setDocentes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campanasRes, docentesRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/campanas/mostrarCampanas`),
          axios.get(`http://localhost:3000/api/docentes/obtenerDocentes`),
        ]);
        setCampañas(campanasRes.data);
        setDocentes(docentesRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      const res = await axios.delete(`http://localhost:3000/api/campanas/eliminarCampana/${id}`);
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
    console.log(error);
    Swal.fire('Error', 'Error al eliminar la campaña', 'error');
  }
};

  return (
    <div className="d-flex">
      <NavegadorDocente />

      {/* Contenido principal */}
      <div className="container" style={{ marginLeft: '260px' }}>
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
                <td>{docentes.find(docente => docente.id_usuario === campaña.id_docente).nombre} {docentes.find(docente => docente.id_usuario === campaña.id_docente).apellido}</td>
                <td>
                  <button className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#nuevaCampañaModal" onClick={() => setNuevaCampaña(campaña)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarCampaña(campaña.id_campaña)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionarCampañas;
