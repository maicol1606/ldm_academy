import React, { useState, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioAdmin from './Paginas/Administrador/InicioAdmin';
import AdminHome from './Paginas/Administrador/AdminHome';
import NavegacionAdmin from './Componentes/NavegacionAdmin';
import Home from './Paginas/default/Home';
import Registar from './Paginas/default/registar';
import Campañas from './Paginas/estudiante/Campañas';


//Importar las ruras de las paginas
const Certificados = lazy(() => import('./Paginas/estudiante/Certificados'));
const Perfil = lazy(() => import('./Paginas/estudiante/PerfilEstudiante'));
const HomePage = lazy(() => import('./Componentes/HomePage'));
const AdminMenu = lazy(() => import('./Paginas/Administrador/AdminMenu'));
const CampaignList = lazy(() => import('./Paginas/Administrador/CampaignList'));
const CampaignNew = lazy(() => import('./Paginas/Administrador/CampaignNew'));
const CampaignSearch = lazy(() => import('./Paginas/Administrador/CampaignSearch'));
const AsignarHoras = lazy(() => import('./Paginas/Docente/AsignarHoras'));
function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path='/admin/home' exact element={<InicioAdmin />} />
        <Route path='/admin' exact element={<AdminHome />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/nav' element={<NavegacionAdmin />} />
        <Route exact path='/registar' element={<Registar />} />
        <Route path ="/homepage" element={<HomePage />} />
        <Route path="/campañas" element={<Campañas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/campaignList" element={<CampaignList />} />
        <Route path="/CampaignNew" element={<CampaignNew />} />
        <Route path='/CampaignSearch' element={<CampaignSearch />} />
        <Route path='/asignarHoras' element={<AsignarHoras />} />
      </Routes>
    </BrowserRouter>

    // Asministrador
  )
}

export default App
