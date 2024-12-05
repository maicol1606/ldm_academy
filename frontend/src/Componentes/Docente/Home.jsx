import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido, Docente</h1>
      <p>Aquí podrás gestionar a los estudiantes y las campañas.</p>
      <div>
        <button>
          <Link to="/gestionar-estudiantes">Gestionar Estudiantes</Link>
        </button>
        <button>
          <Link to="/gestionar-campañas">Gestionar Campañas</Link>
        </button>
        <button>
          <Link to="/perfil">Mi Perfil</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
