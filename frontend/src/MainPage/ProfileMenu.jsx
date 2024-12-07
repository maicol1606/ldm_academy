import React from 'react';

const ProfileMenu = () => (
  <div className="sub-menu-wrap" id="subMenu">
    <div className="sub menu">
      <div className="user-info">
        <img src="/profile-menu-img/images/user.png" alt="User" />
        <h2>Estudiante</h2>
      </div>
      <hr />
      <a href="/editar-perfil" className="sub-menu-link">
        <img src="/profile-menu-img/images/profile.png" alt="Profile" />
        <p>Editar perfil</p>
        <span>&gt;</span>
      </a>
      <a href="/settings" className="sub-menu-link">
        <img src="/profile-menu-img/images/setting.png" alt="Settings" />
        <p>Configuración</p>
        <span>&gt;</span>
      </a>
      <a href="/help" className="sub-menu-link">
        <img src="/profile-menu-img/images/help.png" alt="Help" />
        <p>Ayuda</p>
        <span>&gt;</span>
      </a>
      <a href="/logout" className="sub-menu-link">
        <img src="/profile-menu-img/images/logout.png" alt="Logout" />
        <p>Cerrar sesión</p>
        <span>&gt;</span>
      </a>
    </div>
  </div>
);

export default ProfileMenu;
