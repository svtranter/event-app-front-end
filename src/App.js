import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import Button from "react-bootstrap/Button";
import "./App.css";

function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const login = (token) => {
    window.localStorage.setItem("token", token);
    changeToken(token);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    changeToken(undefined);
  };

  return (
    <>
      {token ? (
        <>
          <Dashboard client={client} />
          <br />
          <Button variant="dark" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )}
    </>
  );
}

export default App;
