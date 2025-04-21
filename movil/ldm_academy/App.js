import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//de fault
import Home from './Screen/Home';
import Login from './Screen/Login'; 
import Register from './Screen/Register'; 
//Admin
import AdminHome from './Screen/Admin/AdminHome';
import NavegacionAdmin from './Screen/Admin/NavegacionAdmin';
import NotificacionesAdmin from './Screen/Admin/NotificacionesAdmin';
import EstudianteNew from './Screen/Admin/EstudianteNew';
import EstudianteList from './Screen/Admin/EstudianteList';
import DocenteList from './Screen/Admin/DocenteList';
import DocenteNew from './Screen/Admin/DocenteNew';
import CampaignNew from './Screen/Admin/CampaignNew';
import CampaignList from './Screen/Admin/CampaignList';
//estudiante
import HomeEstudiante from './Screen/Estudiante/HomeEstudiante';
import NavegadorEstudiante from './Screen/Estudiante/NavegadorEstudiante';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  
  <Stack.Navigator initialRouteName="Home">
    
    {/**de fault */}
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    {/**admin*/}
    <Stack.Screen name="AdminHome" component={AdminHome} />
    <Stack.Screen name="NavegacionAdmin" component={NavegacionAdmin} />
    <Stack.Screen name="NotificacionesAdmin" component={NotificacionesAdmin} />
    <Stack.Screen name="EstudianteNew" component={EstudianteNew} />
    <Stack.Screen name="EstudianteList" component={EstudianteList} />
    <Stack.Screen name="DocenteList" component={DocenteList} />
    <Stack.Screen name="DocenteNew" component={DocenteNew} />
    <Stack.Screen name="CampaignList" component={CampaignList} />
    <Stack.Screen name="CampaignNew" component={CampaignNew} />
    {/**Estudiante */}
    <Stack.Screen name="HomeEstudiante" component={HomeEstudiante} />
    <Stack.Screen name="NavegadorEstudiante" component={NavegadorEstudiante} />
    
  </Stack.Navigator>
</NavigationContainer>


  );
}
