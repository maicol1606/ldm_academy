import React, { useState } from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
const NotificaionesAdmin = () => {
  const [notifications] = useState([
    {
      id: '1123132132',
      name: 'Zinzu Chan Lee',
      campaign: 'Comedor',
      avatar: './assets/avatar/avatar1.png',
    },
    {
      id: '278454152',
      name: 'Jeta Saru',
      campaign: 'Enfermeria',
      avatar: './assets/avatar/avatar3.png',
    },
    {
      id: '345654654',
      name: 'Sonal Gharti',
      campaign: 'Salón',
      avatar: './assets/avatar/avatar4.png',
    },
  ]);

  const toggleNotifi = () => {
    const box = document.getElementById('box');
    box.classList.toggle('active');
  };

  return (
    <section className="full-box page-content">
        <NavegacionAdmin />
      <nav className="full-box navbar-info">
        <a href="#" className="float-left show-nav-lateral">
          <i className="fas fa-exchange-alt"></i>
        </a>

        <a className="profile-link" onClick={toggleNotifi}>
          <i className="fa-solid fa-bell"></i>
          <div className="notifi-box" id="box">
            <h2>
              Notifications <span>17</span>
            </h2>
            {notifications.map((notification) => (
              <div className="notifi-item" key={notification.id}>
                <img src={notification.avatar} alt="img" />
                <div className="text">
                  <h4>{notification.name}</h4>
                  <p>@lorem ipsum dolor sit amet</p>
                </div>
              </div>
            ))}
          </div>
        </a>

        <a href="perfil.html" className="profile-link">
          <i className="fas fa-user-cog"></i>
        </a>

        <a href="login2.html">
          <i className="fas fa-power-off"></i>
        </a>
      </nav>

      <section className="table__header">
        <h1>Notificaciones</h1>
      </section>

      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Campaña</th>
              <th>Ver Perfil</th>
              <th>Aceptar</th>
              <th>Rechazar</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>
                  <img src={notification.avatar} alt="" />
                  {notification.name}
                </td>
                <td>{notification.campaign}</td>
                <td>
                  <a href="perfill.html" className="status delivered">
                    Ver perfil
                  </a>
                </td>
                <td>
                  <p className="status delivered">
                    <a href="#">Aceptar</a>
                  </p>
                </td>
                <td>
                  <p className="status delivered">
                    <a href="#">Rechazar</a>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default NotificaionesAdmin;
