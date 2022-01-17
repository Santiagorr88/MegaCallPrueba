import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/UserContext";
import "../../scss/form.scss";

export const Login = ({ setToken }) => {
  const context = useContext(AuthContext);
  const { setUser } = context;

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const TOKEN = "token";

  useEffect(() => {
    getTokenLocalStorage();
  }, []);

  const handleInputLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (loginUser.email !== "" || loginUser.password !== "") {
      axios
        .post("http://localhost:4000/users/login", {
          email: loginUser.email,
          password: loginUser.password,
        })
        .then((response) => {
          // console.log(response);
          localStorage.setItem(TOKEN, response.data.token);
          setToken(response.data.token);
          setLoginUser({
            email: "",
            password: "",
          });
          const dataDecode = jwtDecode(response.data.token);
          const user = {
            auth: {
              email: dataDecode.user.email,
              name: dataDecode.user.name,
              token: response.data.token,
              user_id: dataDecode.user.id,
            },
          };
          setUser(user);
        })
        .catch((error) => console.error("Error handleSubmitLogin", error));
    } else {
      alert("Campos Vacios");
    }
  };
  const getTokenLocalStorage = () => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const dataDecode = jwtDecode(token);
      const user = {
        auth: {
          email: dataDecode.user.email,
          name: dataDecode.user.email,
          token: token,
          user_id: dataDecode.user.id,
        },
      };
      setUser(user);
    }
  };
  return (
    <>
      <div className="auth__main">
        <div className="auth__box-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmitLogin}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginUser.email}
              onChange={handleInputLogin}
              autoComplete="off"
              className="auth__input"
            />

            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginUser.password}
              onChange={handleInputLogin}
              className="auth__input"
            />

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
