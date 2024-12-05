import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioAdmin from './Paginas/Administrador/InicioAdmin';
import AdminHome from './Paginas/Administrador/AdminHome';
import Home from './Paginas/default/Home';


function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path='/' element={<InicioAdmin />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/home' element={<Home />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
