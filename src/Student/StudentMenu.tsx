import React from "react";
import "../../styles/Student.css";

const StudentMenu: React.FC = () => {
  return (
    <div className="student-menu">
      <h2>Menú del Estudiante</h2>
      <ul>
        <li>Inicio</li>
        <li>Campañas Disponibles</li>
      </ul>
    </div>
  );
};

export default StudentMenu;
