import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/AuthContext";
import useAuth from "./hooks/useAuth";
import AdminNavigator from "./navigation/AdminNavigator";
import EmpleadoNavigator from "./navigation/EmpleadoNavigator";
import ClienteNavigator from "./navigation/ClienteNavigator";
import PublicNavigator from "./navigation/PublicNavigator";
import Loader from "./components/Loader";
import { useFonts } from 'expo-font';
import FlashMessage from "react-native-flash-message";
import Constants from "expo-constants";

export default function App() {

  const [fontsLoaded] = useFonts({
    "Homer-Simpson": require("./assets/font/Homer_Simpson.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
   
      <NavigationContainer>
        <FlashMessage position="top" style={{ paddingTop: Constants.statusBarHeight, }} />
        <MainNavigator />
      </NavigationContainer>
    
  );
}

function MainNavigator() {

      return <PublicNavigator />;
  }
