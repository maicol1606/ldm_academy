import React, { useState } from 'react';

const GestionarCampañas = () => {
  const [campañas, setCampañas] = useState([
    { id: 1, nombre: 'Campaña de Reciclaje', descripcion: 'Recoge residuos en la comunidad' },
    { id: 2, nombre: 'Campaña de Salud', descripcion: 'Promueve hábitos saludables' },
    { id: 3, nombre: 'Campaña de Alimentación', descripcion: 'Distribuye alimentos entre los estudiantes' },
  ]);

 
  const [nuevaCampaña, setNuevaCampaña] = useState({ nombre: '', descripcion: '' });

  // Función para agregar una nueva campaña
  const agregarCampaña = () => {
    const id = campañas.length + 1;
    setCampañas([...campañas, { id, nombre: nuevaCampaña.nombre, descripcion: nuevaCampaña.descripcion }]);
    setNuevaCampaña({ nombre: '', descripcion: '' }); // Limpiar el formulario
  };

  // Función para eliminar una campaña
  const eliminarCampaña = (id) => {
    setCampañas(campañas.filter((campaña) => campaña.id !== id));
  };

  // Función para actualizar el formulario de nueva campaña
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCampaña({ ...nuevaCampaña, [name]: value });
  };

  return (
    <div className="d-flex">
      {/* Menú estático */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
        <h4 className="mb-4">Menú</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a href="#servicios" className="nav-link active">Información de Servicios Sociales</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#login" className="nav-link">Login</a>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="container" style={{ marginLeft: '260px' }}>
        <h2 className="text-center mb-4">Gestionar Campañas</h2>

        {/* Botón para abrir el formulario */}
        <button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#nuevaCampañaModal">Agregar Nueva Campaña</button>

        {/* Tabla de campañas */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {campañas.map((campaña) => (
              <tr key={campaña.id}>
                <td>{campaña.nombre}</td>
                <td>{campaña.descripcion}</td>
                <td>
                  <button className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#nuevaCampañaModal" onClick={() => setNuevaCampaña(campaña)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarCampaña(campaña.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para agregar o editar campaña */}
        <div className="modal fade" id="nuevaCampañaModal" tabIndex="-1" aria-labelledby="nuevaCampañaModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="nuevaCampañaModalLabel">{nuevaCampaña.id ? 'Editar Campaña' : 'Nueva Campaña'}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre de la campaña</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={nuevaCampaña.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      value={nuevaCampaña.descripcion}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (nuevaCampaña.id) {
                      setCampañas(campañas.map(campaña => campaña.id === nuevaCampaña.id ? nuevaCampaña : campaña));
                    } else {
                      agregarCampaña();
                    }
                    document.getElementById('nuevaCampañaModal').classList.remove('show');
                    document.querySelector('.modal-backdrop').remove();
                  }}
                >
                  {nuevaCampaña.id ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionarCampañas;
