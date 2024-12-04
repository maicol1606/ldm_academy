import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import CardComponent from '../Componentes/Card';
import InputForm from '../Componentes/InputForm';
import BottonForm from '../Componentes/BottonForm';

const Login = () => {
  const [user, setUser] = useState("");
  const [contra, setContra] = useState("");
  const { IniciarSesion } = useAuth();

  const Acceso = (e) => {
    e.preventDefault();
      let credenciales = {
        userName: user,
        password: contra,
      };
      IniciarSesion('https://nestjs-pawn-shop.up.railway.app/api/auth/login', credenciales);
  };

  return (
    <Box className='flex justify-center w-screen'>
      <CardComponent>
        <Box className='flex flex-col items-center gap-3'>
          <LoginIcon fontSize="large" color='primary' />
          <Typography component="h1" variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
          <InputForm label="Usuario *" type="text" value={user} onChange={(e) => setUser(e.target.value)} />
          <InputForm label="Contraseña *" type="password" value={contra} onChange={(e) => setContra(e.target.value)} />
        </Box>
        <BottonForm
          fullsize={true}
          descripcion="Iniciar Sesión"
          href="/Inicio"
          onClick={(e) => Acceso(e)}
        />
      </CardComponent>
    </Box>
  );
};

export default Login;
