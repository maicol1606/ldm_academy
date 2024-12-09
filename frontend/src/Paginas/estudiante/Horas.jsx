import React, { useState } from 'react';
import NavegacionAdmin from '../../Componentes/NavegacionEstudiante';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registramos los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Horas = () => {
  // Datos de ejemplo para las horas trabajadas en la semana (de lunes a viernes)
  const [horasSemana, setHorasSemana] = useState([3, 4, 2, 5, 3]); // Horas por día, máximo 5 horas por día
  const [horasTotales, setHorasTotales] = useState(15); // Total de horas acumuladas, ejemplo

  // Función para actualizar las horas totales (puedes modificar esto según cómo se manejen las horas en tu app)
  const sumarHoras = (horas) => {
    if (horasTotales + horas <= 120) {
      setHorasTotales(horasTotales + horas);
    } else {
      alert('El máximo de horas es 120');
    }
  };
  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    datasets: [
      {
        label: 'Horas Trabajadas (Semana)',
        data: horasSemana,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Opciones para la gráfica
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // Máximo de 5 horas por día
      },
    },
  };

  return (
    <div className="d-flex">
      {/* Menú lateral */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
        <h4 className="mb-4">Menú</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a href="#perfil" className="nav-link active">Ver Perfil</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#horas" className="nav-link">Ver Horas</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#campañas" className="nav-link">Campañas</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#certificados" className="nav-link">Certificados</a>
          </li>
          <li className="nav-item mb-3">
            <a href="#notificaciones" className="nav-link">Notificaciones</a>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="container" style={{ marginLeft: '260px' }}>
        <section id="horas" className="mt-5">
          <h2 className="text-center mb-4">Horas de Servicio Social</h2>

          {/* Gráfica de progreso semanal */}
          <div className="mb-5">
            <h4>Progreso Semanal</h4>
            <Line data={data} options={options} />
          </div>

          {/* Contador de horas */}
          <div className="mb-5">
            <h4>Horas Acumuladas: {horasTotales} / 120</h4>
            <button className="btn btn-primary" onClick={() => sumarHoras(5)}>
              Agregar 5 Horas
            </button>
            <button className="btn btn-primary ml-2" onClick={() => sumarHoras(3)}>
              Agregar 3 Horas
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Horas;
