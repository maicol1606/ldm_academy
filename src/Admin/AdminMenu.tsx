import React from "react";
import "../../styles/Admin.css";

const AdminMenu: React.FC = () => {
  return (
    <div className="admin-menu">
      <h2>Menú del Administrador</h2>
      <ul>
        <li>Gestión de Estudiantes</li>
        <li>Gestión de Docentes</li>
      </ul>
    </div>
  );
};

export default AdminMenu;
