import React from 'react';
import "./css/style.css";
import Header from '../HomePage/Header';
import Content from './Content';
import Sidebar from './Sidebar';

const GenericPage = () => (
  <div id="wrapper">
    <div id="main">
      <div className="inner">
        <Header />
        <Content />
      </div>
    </div>
    <Sidebar />
  </div>
);

export default GenericPage;
