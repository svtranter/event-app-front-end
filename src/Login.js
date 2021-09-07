import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function Login(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    props.client
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false);
        console.log(response.data);
        props.loggedIn(response.data.token);
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      <h2>Login</h2>
      <br />
      <form onSubmit={(e) => submitHandler(e)}>
        Username
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        Password
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
        <br />
        <Button variant="dark" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </Button>
      </form>
    </>
  );
}

export default Login;
