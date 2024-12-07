import "./css/style.css";
import React from 'react';
import Header from './Header';
import Banner from './Banner';
import Campaigns from './Campaigns';
import Sidebar from './Sidebar';

const HomePage = () => (
  <div id="wrapper">
    <div id="main">
      <div className="inner">
        <Header />
        <Banner />
        <Campaigns />
      </div>
    </div>
    <Sidebar />
  </div>
);

export default HomePage;
