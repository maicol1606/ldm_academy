
import axios from 'axios';
import NavegadorDocente from '../../Componentes/NavegadorDocente';
import { FaUserClock, FaClock, FaPlus, FaExclamationTriangle, FaEdit, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

const estudiantesMock = [
  
];

const AsignarHoras = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [nuevasHoras, setNuevasHoras] = useState(0);
  const [reporteActivo, setReporteActivo] = useState(false);
  const [reporteNovedad, setReporteNovedad] = useState('');
  const [justificacionReasignacion, setJustificacionReasignacion] = useState('');
  const [reasignandoHoras, setReasignandoHoras] = useState(false);


  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/estudiantes/obtenerEstudiantes');
        setEstudiantes(res.data); // usa los datos de la BD
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    };

    fetchEstudiantes();
  }, []);

  const seleccionarEstudiante = (id) => {
    const estudiante = estudiantes.find((e) => e.id === id);
    setEstudianteSeleccionado(estudiante);
  };

  const handleHorasChange = (e) => {
    setNuevasHoras(parseInt(e.target.value));
  };

  const asignarHoras = () => {
    if (!estudianteSeleccionado) {
      alert('Debe seleccionar un estudiante.');
      return;
    }

    const hoy = new Date().toLocaleDateString();
    const totalHorasHoy = estudianteSeleccionado.asistencia.reduce((total, a) => total + (a.dia === hoy ? a.horas : 0), 0);

    if (totalHorasHoy > 0 && !reasignandoHoras) {
      setReasignandoHoras(true);
      return;
    }

    if (reasignandoHoras && !justificacionReasignacion.trim()) {
      alert('Debe justificar la reasignación de horas.');
      return;
    }

    if (totalHorasHoy + nuevasHoras > 6) {
      alert('No puedes asignar más de 6 horas por día.');
      return;
    }

    const nuevaAsistencia = {
      dia: hoy,
      horas: nuevasHoras,
      horario: '8:00 AM - 12:00 PM',
      justificacion: reasignandoHoras ? justificacionReasignacion : null,
    };

    const nuevosEstudiantes = estudiantes.map((e) =>
      e.id === estudianteSeleccionado.id
        ? { ...e, asistencia: [...e.asistencia, nuevaAsistencia] }
        : e
    );

    setEstudiantes(nuevosEstudiantes);
    setEstudianteSeleccionado({ ...estudianteSeleccionado, asistencia: [...estudianteSeleccionado.asistencia, nuevaAsistencia] });
    setNuevasHoras(0);
    setJustificacionReasignacion('');
    setReasignandoHoras(false);
    alert('Horas asignadas correctamente.');
  };

  return (
    <div className="d-flex">
      <NavegadorDocente />
      <div className="container" style={{ marginLeft: '260px' }}>
        <h2 className="text-center mb-4">Asignar Horas</h2>

        {/* Lista de estudiantes */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title"><FaUserClock /> Seleccionar Estudiante</h5>
            <div className="d-flex flex-wrap">
              {estudiantes.map((est) => (
                <div key={est.id} className="card m-2 p-2 text-center shadow" style={{ width: '180px', cursor: 'pointer' }} onClick={() => seleccionarEstudiante(est.id)}>
                  <img src={est.foto} className="rounded-circle mx-auto mb-2" alt="Perfil" style={{ width: '50px' }} />
                  <h6 className="mb-0">{est.nombre}</h6>
                  <small>{est.numeroIdentificacion}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {estudianteSeleccionado && (
          <div className="d-flex">
            {/* Cuadro de asignación de horas */}
            <div className="card text-center p-3 shadow-sm me-3" style={{ width: '250px' }}>
              <FaClock size={40} className="mx-auto text-primary" />
              <h5 className="mt-2">Asignar Horas</h5>
              <input type="number" className="form-control my-2" value={nuevasHoras} onChange={handleHorasChange} min="1" max="6" />
              <button className="btn btn-success" onClick={asignarHoras}>Confirmar</button>
              {reasignandoHoras && (
                <div className="mt-2">
                  <textarea className="form-control" placeholder="Justifique la reasignación" value={justificacionReasignacion} onChange={(e) => setJustificacionReasignacion(e.target.value)} />
                </div>
              )}
            </div>

            {/* Total de horas */}
            <div className="card text-center p-3 shadow-sm me-3" style={{ width: '250px' }}>
              <FaClock size={40} className="mx-auto text-info" />
              <h5 className="mt-2">Total de Horas</h5>
              <p className="fs-4">{estudianteSeleccionado.asistencia.reduce((total, a) => total + a.horas, 0)} horas</p>
            </div>

            {/* Horas hechas hasta ahora */}
            <div className="card text-center p-3 shadow-sm me-3" style={{ width: '250px' }}>
              <FaCheckCircle size={40} className="mx-auto text-success" />
              <h5 className="mt-2">Horas Hechas</h5>
              <p className="fs-4">{estudianteSeleccionado.asistencia.length} días con asistencia</p>
            </div>

            {/* Alertas/Novedades */}
            <div className="card text-center p-3 shadow-sm me-3" style={{ width: '250px' }}>
              <FaExclamationTriangle size={40} className="mx-auto text-danger" />
              <h5 className="mt-2">Novedades</h5>
              {estudianteSeleccionado.novedades ? (
                <p>{estudianteSeleccionado.novedades}</p>
              ) : (
                <p className="text-muted">Sin novedades</p>
              )}
              <button className="btn btn-warning" onClick={() => setReporteActivo(true)}>Reportar</button>
            </div>
          </div>
        )}

        {reporteActivo && (
          <div className="modal">
            <textarea className="form-control" placeholder="Escriba la novedad" value={reporteNovedad} onChange={(e) => setReporteNovedad(e.target.value)} />
            <button className="btn btn-primary mt-2" onClick={() => { setReporteActivo(false); alert('Novedad reportada.'); }}>Enviar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsignarHoras;