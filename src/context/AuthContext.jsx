import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Crear un hook para facilitar el uso del contexto
export const useAuth = () => useContext(AuthContext);

// AuthProvider que envuelve a los componentes de la app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null); // Almacena el usuario autenticado
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // Función para manejar el login
  const IniciarSesion = async (url, credenciales) => {
    try {
      const response = await axios.post(url, credenciales, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Asumiendo que la respuesta incluye un token y datos del usuario
      const decoded = jwtDecode(response.data.access_token); // Decodificar el token
      console.log(decoded);
      if (response.data.access_token) {

        // Almacenar en localStorage y actualizar estado
        localStorage.setItem("user", JSON.stringify(decoded)); // Guarda el usuario decodificado en localStorage
        localStorage.setItem("token", response.data.access_token);

        setUser(decoded); // Configura el usuario en el estado
        setToken(response.data.access_token); // Configura el token en el estado
        navigate("/Inicio"); // Redirecciona al usuario a la página de inicio
      } else {
        alert("Credenciales inválidas.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err.message);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
      navigate("/"); // Opcional, redirige al login si hay error
    }
  };

  // Función para manejar el logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/"); // Redirecciona al usuario a la página de login
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decoded = jwtDecode(savedToken); // Decodifica el token guardado
      setToken(savedToken);
      setUser(decoded); // Actualiza el usuario con la información decodificada
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, IniciarSesion, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
