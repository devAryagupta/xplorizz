import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
  //console.log(localStorage); working fine
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  // login form ne  data return kiya tha usne local storage me set kia .
  //local storage se yhn get kiya hai
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);
// updates token state and localStorage whenever token changes
  // useEffect is used to update the localStorage whenever the token changes  
  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    //define whtat value we want to provide to the children
    //value={{ token, login, logout }}  // this is the value we are providing to the children 
    //children is the prop that we are passing to the provider
    // so that we can use it in the children components
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};