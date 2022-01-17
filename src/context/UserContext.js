import React, { createContext, useState } from "react";
import { userAuth } from "../services/dataObject";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [dataAuth, setDataAtuh] = useState({
    auth: userAuth(),
  });
  const setUser = (user) => {
    setDataAtuh(user);
  };
  const context = {
    dataAuth,
    setDataAtuh,
    setUser,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
