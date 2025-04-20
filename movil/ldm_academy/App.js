import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//de fault
import Home from './Screen/Home';
import Login from './Screen/Login'; 
import Register from './Screen/Register'; 
//estudiante
import HomeEstudiante from './Screen/Estudiante/HomeEstudiante';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  
  <Stack.Navigator initialRouteName="Home">
    {/**de fault */}
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    {/**Estudiante */}
    <Stack.Screen name="HomeEstudiante" component={HomeEstudiante} />
  </Stack.Navigator>
</NavigationContainer>

  );
}
