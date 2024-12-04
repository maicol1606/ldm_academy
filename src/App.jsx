// import { Box, Button, CardContent, TextField } from "@mui/material";
// import { Tabla } from "./Componentes/Tabla";
// import CardComponent from "./Componentes/Card";
// import InputForm from "./Componentes/InputForm";
// import BottonForm from "./Componentes/BottonForm";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Inicio from "./Pages/Inicio";
import Clientes from "./Pages/Clientes";
import Carros from "./Pages/Carros";
import Empeños from "./Pages/Empeños";
import Historial from "./Pages/Hisotrial";
import PrivateRouter from "./routes/PrivateRouter";
import AgregarClientes from "./Pages/AgregarClientes";
import { AgregarCarros } from "./Pages/AgregarCarros";
import { NotFound } from "./Pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
export default function App() {
  return (
    <>
      <AuthProvider>
        {/* <Router> */}
        
        <Routes>
          {/* Rutas publicas */}
          {/* Ruta a la página de login */}
          <Route path="/" element={<Login />} />

          {/* Ruta a la página de login */}
          <Route path="*" element={<NotFound />} />
          {/* Rutas privadas */}
          {/* Ruta a la página de Inicio */}
          
          <Route
            path="/Inicio"
            element={
              <PrivateRouter>
                <Inicio />
              </PrivateRouter>
            }
          />
          {/* Ruta a la página de Clientes */}
          <Route
            path="/Clientes"
            element={
              <PrivateRouter>
                <Clientes />
              </PrivateRouter>
            }
          />
          {/* Ruta a la página de Agregar Clientes */}
          <Route
            path="/AgregarClientes"
            element={
              <PrivateRouter>
                <AgregarClientes />
              </PrivateRouter>
            }
          />
          {/* Ruta a la página de Carros */}
          <Route
            path="/Autos"
            element={
              <PrivateRouter>
                <Carros />
              </PrivateRouter>
            }
          />

          <Route
            path="/AgregarCarros"
            element={
              <PrivateRouter>
                <AgregarCarros />
              </PrivateRouter>
            }
          />

          {/* Ruta a la página de Empeños */}
          <Route
            path="/Prestamos"
            element={
              <PrivateRouter>
                <Empeños />
              </PrivateRouter>
            }
          />
          {/* Ruta a la página de Historial */}
          <Route
            path="/Historial"
            element={
              <PrivateRouter>
                <Historial />
              </PrivateRouter>
            }
          />
        </Routes>
        {/* </Router> */}
      </AuthProvider>
    </>
  );
}
