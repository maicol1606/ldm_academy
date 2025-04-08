import React, { useState, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RutaPrivada from './Componentes/RutaPrivada';
import RutaPublica from './Componentes/RutaPublica';





//import OlvidarContraseña from './Paginas/default/OlvidarContraseña';

//admin
const AdminHome = lazy(() => import('./Paginas/Administrador/AdminHome'));
const AdminMenu = lazy(() => import('./Paginas/Administrador/AdminMenu'));
const CampaignList = lazy(() => import('./Paginas/Administrador/CampaignList'));
const CampaignNew = lazy(() => import('./Paginas/Administrador/CampaignNew'));
const CampaignSearch = lazy(() => import('./Paginas/Administrador/CampaignSearch'));
const EstudianteList = lazy(() => import('./Paginas/Administrador/EstudianteList'));
const EstudianteNew = lazy(() => import('./Paginas/Administrador/EstudianteNew'));
const DocenteList = lazy(() => import('./Paginas/Administrador/DocenteList'));
const DocenteNew = lazy(() => import('./Paginas/Administrador/DocenteNew'));
const NotificacionesAdmin = lazy(() => import('./Paginas/Administrador/NotificacionesAdmin'));
const CertificadoAdmin = lazy(() => import('./Paginas/Administrador/CertificadoAdmin'));


//estudiante 
const BuscarCampañas = lazy(() => import('./Paginas/estudiante/BuscarCampañas'));
const Campañas = lazy(() => import('./Paginas/estudiante/Campañas'));
const GenCertificados = lazy(() => import('./Paginas/estudiante/GenCertificados'));
const PerfilEstudiante = lazy(() => import('./Paginas/estudiante/PerfilEstudiante'));
const Horas = lazy(() => import('./Paginas/estudiante/Horas'));
const HomeEstudiante = lazy(() => import('./Paginas/estudiante/HomeEstudiante'));
const Postularse = lazy(() => import('./Paginas/estudiante/Postularse'));
const Notificaciones = lazy(() => import('./Paginas/estudiante/Notificaciones'));
const InformacionCampaña = lazy(() => import('./Paginas/estudiante/InformacionCampaña'));
const ListCampañas = lazy(() => import('./Paginas/estudiante/ListCampañas'));


//docente
const AsignarHoras = lazy(() => import('./Paginas/Docente/AsignarHoras'));
const CrearCampaña = lazy(() => import('./Paginas/Docente/CrearCampaña'));
const GestionarCampañas = lazy(() => import('./Paginas/Docente/GestionarCampañas'));
const HomeDocentes = lazy(() => import('./Paginas/Docente/HomeDocentes'));
const PerfilDocente = lazy(() => import('./Paginas/Docente/PerfilDocente'));


//conponentes
const HomePage = lazy(() => import('./Componentes/HomePage'));
const Banner = lazy(() => import('./Componentes/Banner'));
const CampaignItems = lazy(() => import('./Componentes/CampaignItem'));
const Campaigns = lazy(() => import('./Componentes/Campaigns'));
const Content = lazy(() => import('./Componentes/Content'));
const GenericPage = lazy(() => import('./Componentes/GenericPage'));
const Header = lazy(() => import('./Componentes/Header'));
const MiniPost = lazy(() => import('./Componentes/MiniPost'));
const Sidebar = lazy(() => import('./Componentes/Sidebar'));
const NavegacionEstudiante = lazy(() => import('./Componentes/NavegacionEstudiante'));
const NavegacionAdmin = lazy(() => import('./Componentes/NavegacionAdmin'));
const Error = lazy(() => import('./Componentes/Error'));

//default
const Login = lazy(() => import('./Paginas/default/Login'));
const Registar = lazy(() => import('./Paginas/default/Registar'));
const OlvidarContrasena = lazy(() => import('./Paginas/default/OlvidarContrasena'));
const Recuperar = lazy(() => import('./Paginas/default/Recuperar'));
function App() {


  return (

    <BrowserRouter>
      <Routes>
        {/* Rutas para el admin */}
        <Route element={<RutaPrivada requiredRol={1} />}>
          <Route path='/admin/' exact element={<AdminHome />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/campaignList" element={<CampaignList />} />
          <Route path="/CampaignNew" element={<CampaignNew />} />
          <Route path='/CampaignSearch' element={<CampaignSearch />} />
          <Route path='/EstudianteList' element={<EstudianteList />} />
          <Route path='/DocenteList' element={<DocenteList />} />
          <Route path='/DocenteNew' element={<DocenteNew />} />
          <Route path='/EstudianteNew' element={<EstudianteNew />} />
          <Route path='/NotificacionesAdmin' element={<NotificacionesAdmin />} />
          <Route path='/CertificadoAdmin' element={<CertificadoAdmin />} />
        </Route>


        {/* Rutas para el estudiante */}
        <Route element={<RutaPrivada requiredRol={2} />}>
          <Route path="/HomeEstudiante" element={<Campañas />} />
          <Route path="/perfil" element={<PerfilEstudiante />} />
          <Route path="/buscarCampaña" element={<BuscarCampañas />} />
          <Route path="/si" element={<HomeEstudiante />} />
          <Route path='/postularse' element={<Postularse />} />
          <Route path="/Horas" element={<Horas />} />
          <Route path='/notificaciones' element={<Notificaciones />} />
          <Route path='/GenCertificados' element={<GenCertificados />} />
          <Route path='/InformacionCampaña' element={<InformacionCampaña />} />
          <Route path='/ListCampañas' element={<ListCampañas />}></Route>
        </Route>

        {/* Rutas para el docente */}
        <Route element={<RutaPrivada requiredRol={3} />}>
          <Route path="/perfilDocente" element={<PerfilDocente />} />
          <Route path='/asignarHoras' element={<AsignarHoras />} />
          <Route path='/crearCampaña' element={<CrearCampaña />} />
          <Route path='/gestionarCampañas' element={<GestionarCampañas />} />
          <Route path='/homeDocentes' element={<HomeDocentes />} />
        </Route>

        {/* Rutas para el default */}
        <Route element={<RutaPublica />}>
          <Route exact path='/registar' element={<Registar />} />
          <Route path='/login' element={<Login />} />
          <Route path='/olvidarContrasena' element={<OlvidarContrasena />} />
          <Route path='/recuperar' element={<Recuperar />} />
        </Route>

        {/* Rutas para el componentes */}
        <Route element={<RutaPublica />}>
          <Route exact path='/nav' element={<NavegacionAdmin />} />
          <Route path="/" element={<HomePage />} />
          <Route path='/banner' element={<Banner />} />
          <Route path='/campaignItems' element={<CampaignItems />} />
          <Route path='/campaingns' element={<Campaigns />} />
          <Route path='/Content' element={<Content />} />
          <Route path='/general' element={<GenericPage />} />
          <Route path='/header' element={<Header />} />
          <Route path='/minipost' element={<MiniPost />} />
          <Route path='/navestudiante' element={<NavegacionEstudiante />} />
          <Route path='/sidebar' element={<Sidebar />} />
        </Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>

    </BrowserRouter>

    // Asministrador
  )
}

export default App
