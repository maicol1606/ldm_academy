import React from 'react';
import "./css/style.css";
import Header from './Header';
import Sidebar from './Sidebar';

const MainPage = () => (
  <div id="wrapper">
    <div id="main">
      <div className="inner">
        <Header />
        {/* Aquí se puede agregar más contenido si es necesario */}
      </div>
    </div>
    <Sidebar />
  </div>
);

export default MainPage;
