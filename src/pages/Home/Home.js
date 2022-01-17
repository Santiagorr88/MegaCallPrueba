import React, { useEffect, useState } from "react";
import { getUser } from "../../services/api";
import axios from "axios";
export const Home = () => {
  const [users, setUsers] = useState();

  const handleUsers = async () => {
    try {
      const data = await getUser();
      console.log("VAMOS A VER", data);
      setUsers(data);
      cargaUser(data);
    } catch (error) {}
  };
  const cargaUser = async (data) => {
    const promises = await data.results.map((user) => {
      const email = user.email;
      const name = user.name.first;
      const phone = user.phone;
      const password = user.login.password;
      return axios
        .post("https://localhost:4000/users/saveUser", {
          name: name,
          email: email,
          password: password,
          phone: phone,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const result = Promise.all(promises);
    console.log(result);
  };
  return (
    <div>
      <button onClick={handleUsers}> Get Usuario Random</button>
    </div>
  );
};
