import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import Navbar from "../navbar/Navbar";
import userData from "./userData";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  function validateLogin(event) {
    event.preventDefault(); 

    const inputUsername = usernameRef.current.value;
    const inputPassword = passwordRef.current.value;

    const isValidUser = userData.some(
      user => (inputUsername === user.userName && inputPassword === user.password)
    );

    if (isValidUser) {
      localStorage.setItem("loggedIn", "true");
      navigate("/events");
    } else {
      console.log("no");
    }
  }

  return (
    <div id="login">
      <Navbar />
      <h1>Login</h1>
      <form className="login_form" onSubmit={validateLogin}>
        <label htmlFor="username">Username:</label>
        <input className="input_field" type="text" ref={usernameRef} required />

        <label htmlFor="password">Password:</label>
        <input className="input_field" type="password" ref={passwordRef} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
