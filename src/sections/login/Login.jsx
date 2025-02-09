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
    const error = document.getElementById("error_indicator");

    const isValidUser = userData.some(
      (user) =>
        inputUsername === user.userName && inputPassword === user.password
    );

    if (isValidUser) {
      localStorage.setItem("loggedIn", "true");
      error.style.display = "none";

      navigate("/events");
    } else {
      error.style.display = "inline";
    }
  }

  return (
    <div id="login">
      <Navbar />
      <div className="login_container">
        <h1>Login</h1>
        <h3>It's great to see you again! 🪿</h3>

        <form className="login_form" onSubmit={validateLogin}>
          <div className="input_area">
            <label htmlFor="username">Username:</label>
            <input
              className="input_field"
              type="text"
              ref={usernameRef}
              required
            />
          </div>

          <div className="input_area">
            <label htmlFor="password">Password:</label>
            <input
              className="input_field"
              type="password"
              ref={passwordRef}
              required
            />
          </div>
          <p id="error_indicator">username or password is not valid!</p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
