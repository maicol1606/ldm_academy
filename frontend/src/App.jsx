import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioAdmin from './Paginas/Administrador/InicioAdmin';
import AdminHome from './Paginas/Administrador/AdminHome';
import NavegacionAdmin from './Componentes/NavegacionAdmin';
import Home from './Paginas/default/Home';
import Registar from './Paginas/default/registar';


//Importar las ruras de las paginas
const Certificados = lazy(() => import('./Paginas/estudiante/Certificados'));

function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path='/admin/home' exact element={<InicioAdmin />} />
        <Route path='/admin' exact element={<AdminHome />} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/nav' element={<NavegacionAdmin/>} />
        <Route exact path='/registar' element={<Registar/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
