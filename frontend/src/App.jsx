import React, { useState, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminHome from './Paginas/Administrador/AdminHome';
import Registar from './Paginas/default/Registar';
import Campañas from './Paginas/estudiante/Campañas';
//import OlvidarContraseña from './Paginas/default/OlvidarContraseña';





//Importar las ruras de las paginas
const Certificados = lazy(() => import('./Paginas/estudiante/Certificados'));
const PerfilEstudiante = lazy(() => import('./Paginas/estudiante/PerfilEstudiante'));
const HomePage = lazy(() => import('./Componentes/HomePage'));
const AdminMenu = lazy(() => import('./Paginas/Administrador/AdminMenu'));
const CampaignList = lazy(() => import('./Paginas/Administrador/CampaignList'));
const CampaignNew = lazy(() => import('./Paginas/Administrador/CampaignNew'));
const CampaignSearch = lazy(() => import('./Paginas/Administrador/CampaignSearch'));
const AsignarHoras = lazy(() => import('./Paginas/Docente/AsignarHoras'));
const CrearCampaña = lazy(() => import('./Paginas/Docente/CrearCampaña'));
const GestionarCampañas = lazy(() => import('./Paginas/Docente/GestionarCampañas'));
const HomeDocente = lazy(() => import('./Paginas/Docente/HomeDocente'));
const PerfilDocente = lazy(() => import('./Paginas/Docente/PerfilDocente'));
const BuscarCampañas = lazy(() => import('./Paginas/estudiante/BuscarCampañas'));
const Horas = lazy(() => import('./Paginas/estudiante/Horas'));
const HomeEstudiante = lazy(() => import('./Paginas/estudiante/HomeEstudiante'));
const Postularse = lazy(() => import('./Paginas/estudiante/Postularse'));
const Banner = lazy(() => import('./Componentes/Banner'));
const CampaignItems = lazy(() => import('./Componentes/CampaignItem'));
const Campaigns  = lazy(() => import('./Componentes/Campaigns'));
const Content = lazy(() => import('./Componentes/Content'));
const GenericPage = lazy(() => import('./Componentes/GenericPage'));
const Header = lazy(() => import('./Componentes/Header'));
const MiniPost = lazy(() => import('./Componentes/MiniPost'));
const Sidebar = lazy(() => import('./Componentes/Sidebar'));
const NavegacionEstudiante = lazy(() => import('./Componentes/NavegacionEstudiante'));
const NavegacionAdmin = lazy(() => import('./Componentes/NavegacionAdmin'));
const InicioAdmin = lazy(() => import('./Paginas/Administrador/InicioAdmin'));
const Notificaciones = lazy(() => import('./Paginas/estudiante/Notificaciones'));
const Login = lazy(() => import('./Paginas/default/Login'));
//const OlvidarContrasena = lazy(() => import('./Paginas/default/OlvidarContrasena'));
function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path='/admin/home' exact element={<InicioAdmin />} />
        <Route path='/admin' exact element={<AdminHome />} />
       
        <Route exact path='/nav' element={<NavegacionAdmin />} />
        <Route exact path='/registar' element={<Registar />} />
        <Route path ="/homepage" element={<HomePage />} />
        <Route path="/campañas" element={<Campañas />} />
        <Route path="/perfil" element={<PerfilEstudiante />} />
        <Route path="/perfilDocente" element={<PerfilDocente />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/campaignList" element={<CampaignList />} />
        <Route path="/CampaignNew" element={<CampaignNew />} />
        <Route path='/CampaignSearch' element={<CampaignSearch />} />
        <Route path='/asignarHoras' element={<AsignarHoras />} />
        <Route path='/crearCampaña' element={<CrearCampaña />} />
        <Route path='/gestionarCampaña' element={<GestionarCampañas />} />
        <Route path='/homeDocentes' element={<HomeDocente />} />
        <Route path="/buscarCampaña" element={<BuscarCampañas />} />
        <Route path="/HomeEstudiante" element={<HomeEstudiante />} />
        <Route path="/Horas" element={<Horas />} />
        <Route path='/notificaciones' element={<Notificaciones />} />  
        <Route path='/postularse' element={<Postularse />} />
        <Route path='/banner' element={<Banner />} />
        <Route path='/campaignItems' element={<CampaignItems />} />
        <Route path='/campaingns' element={<Campaigns />} />
        <Route path='/Content' element={<Content />} />
        <Route path='/general' element={<GenericPage />} />
        <Route path='/header' element={<Header />} />
        <Route path='/minipost' element={<MiniPost />} />
        <Route path='/navestudiante' element={<NavegacionEstudiante />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/certificado' element={<Certificados />} />

      </Routes>
    </BrowserRouter>

    // Asministrador
  )
}

export default App
