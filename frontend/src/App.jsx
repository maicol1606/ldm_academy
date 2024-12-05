import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InicioAdmin from './Paginas/Administrador/InicioAdmin';
import Home from './components/Home/Home';
import Certificados from './components/Certificados/Certificados';
import ListaCampañas from './components/ListaCampañas/ListaCampañas';
import InfoCampañas from './components/InfoCampañas/InfoCampañas';
import Postularse from './components/Postularse/Postularse';
import Perfil from './components/Perfil/Perfil';
import BuscarCampañas from './components/BuscarCampañas/BuscarCampañas';
import GestionarEstudiantes from './components/GestionarEstudiantes/GestionarEstudiantes';
import GestionarCampañas from './components/GestionarCampañas/GestionarCampañas';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});
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
