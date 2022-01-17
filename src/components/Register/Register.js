import React, { useState } from "react";
import axios from "axios";
import "../../scss/form.scss";

export const Register = ({ setShowLogin }) => {
  const [search, setSearch] = useState("");
  console.log(search);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const searchUser = () => {
    axios
      .get(`http://localhost:4000/users/selectUsersName/${search}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch((error) => console.error("Error en searchUser", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/users/saveUser", {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log("setShowLogin");
        if (response.status === 200) {
          console.log(setShowLogin);
          setShowLogin(true);
        }
      })
      .catch((error) => console.error("Error en handleSubmit", error));
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <h2>Registrarse</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInput}
            className="auth__input"
          />

          <label>Email</label>
          <input
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            className="auth__input"
          />

          <label>Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={user.password}
            onChange={handleInput}
            className="auth__input"
          />
          <button type="submit" className="btn btn-primary btn-block">
            Registrar
          </button>
        </form>

        {/* <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}
        {/* <button onClick={() => searchUser()}>Buscar</button> */}
      </div>
    </div>
  );
};
