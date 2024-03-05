import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setisLogin] = useState(false);

  console.log('Valor actual de isLogin:', isLogin); // Agrega este console.log

  return (
    <AuthContext.Provider value={{ isLogin, setisLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const Autenticado = () => useContext(AuthContext);
