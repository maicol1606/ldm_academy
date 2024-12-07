import "./css/style.css";
import React, { useState } from 'react';
import Login from './Login.jsx';  // Importamos Login
import SignUp from './SignUp.jsx'; // Importamos SignUp

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para gestionar si mostramos Login o Sign Up

  return (
    <div className="card-3d-wrap mx-auto">
      <div className="card-3d-wrapper">
        {isLogin ? (
          <Login /> // Si es Login, mostramos el componente Login
        ) : (
          <SignUp /> // Si no, mostramos el componente SignUp
        )}
        <div className="text-center mt-4">
          <button onClick={() => setIsLogin(!isLogin)} className="btn-toggle">
            {isLogin ? 'Go to Sign Up' : 'Go to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

