
import "./css/style.css";

import React from 'react';
import Header from './Header';
import Banner from './Banner';
import Campaigns from './Campaigns';
import Content from "./Content";

const HomePage = () => (
  <div id="wrapper">
    <div id="main">
      <div className="inner">
        <Header />
        <Banner />
        <Campaigns />
        <Content  />
      </div>
    </div>
  </div>
  
);

export default HomePage;
