import React, { useState } from "react";
import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";
import "../../scss/form.scss";

export const Auth = ({ setToken }) => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      {showLogin ? (
        <Login setToken={setToken} />
      ) : (
        <Register setShowLogin={setShowLogin} />
      )}

      <p>
        {showLogin ? (
          <>
            <button
              onClick={() => setShowLogin(false)}
              className="btn btn-primary btn-block"
            >
              Crear una Cuenta
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="btn btn-primary btn-block"
            >
              Ingresar Con Tu Cuenta
            </button>
          </>
        )}
      </p>
    </>
  );
};
