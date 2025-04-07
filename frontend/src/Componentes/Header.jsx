import React from 'react';
import { Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <div
      className="d-flex flex-column bg-light p-3 position-fixed"
      style={{ height: '100vh', width: '80px', left: 0, top: 0 }}
    >
      {/* Logo */}
      <div className="mb-4 text-center">
        <img
          src="/public/logo.png" // Cambia la ruta según la ubicación de tu logo
          alt="Logo"
          width="50"
          height="50"
          className="d-inline-block"
        />
      </div>

      {/* Menú de navegación */}
      <Nav className="flex-column text-center">
        {/* Ícono de Inicio */}
        <Nav.Link href="/homePage" className="mb-4">
          <i className="bi bi-house-door" style={{ fontSize: '1.5rem' }}></i>
        </Nav.Link>

        {/* Ícono de iniciar sesión */}
        <Nav.Link href="/login" className="mb-4">

          <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
        </Nav.Link>

        {/* Ícono de información */}
        <Nav.Link href="/Registar">
          <i className="bi bi-info-circle" style={{ fontSize: '1.5rem' }}></i>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Header;
