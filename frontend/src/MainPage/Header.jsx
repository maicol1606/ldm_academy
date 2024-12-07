import React from 'react';
import ProfileMenu from './ProfileMenu';

const Header = () => (
  <header id="header">
    <div className="hero">
      <nav className="navi">
        <a href="/" className="logo"><strong>Colegio</strong> Fernando Gonzales Ochoca</a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/horas">Horas</a></li>
          <li><a href="/perfil">Perfil</a></li>
          <li><a href="/logout">Log out</a></li>
        </ul>
        <img
          src="/profile-menu-img/images/user.png"
          className="user-pic"
          onClick={() => document.getElementById('subMenu').classList.toggle('open-menu')}
          alt="User"
        />
        <ProfileMenu />
      </nav>
    </div>
  </header>
);

export default Header;
