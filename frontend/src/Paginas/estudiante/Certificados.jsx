import React from 'react';
import NavegacionAdmin from '../../Componentes/NavegacionAdmin';

function Certificados() {
  return (
    <div>
      <NavegacionAdmin />
      <h1>Generar Certificados</h1>
      <p>Cuando un estudiante complete las 120 horas, podrá generar su certificado aquí.</p>
      <button>Generar certificado</button>
    </div>
  );
}

export default Certificados;
