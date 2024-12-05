import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioAdmin from './Paginas/Administrador/InicioAdmin';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InicioAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
