import React, { useState } from 'react';
import NavegacionEstudiante from '../../Componentes/NavegacionEstudiante';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Horas = () => {
  const [horasSemana, setHorasSemana] = useState([3, 4, 2, 5, 3]); 
  const [horasTotales, setHorasTotales] = useState(15); 

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

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  return (
    <div className="d-flex">
<NavegacionEstudiante />
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
