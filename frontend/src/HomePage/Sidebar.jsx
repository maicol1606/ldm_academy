import React from 'react';

const Sidebar = () => (
  <div id="sidebar">
    <div className="inner">
      <nav id="menu">
        <header className="major">
          <h2>Menú</h2>
        </header>
        <ul>
          <li><a href="/">Homepage</a></li>
          <li><a href="/generic">Generic</a></li>
          <li><a href="/AuthPage">Login</a></li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Sidebar;

