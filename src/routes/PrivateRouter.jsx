import * as React from 'react'
import Navbar from '../Componentes/Navbar'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import MiniDrawer from '../Componentes/Navbar';

const PrivateRouter = ({children}) => {

  const { user } = useAuth();

  return user ? <> <MiniDrawer /> {children} </> : <Navigate to="/" />;

}

export default PrivateRouter