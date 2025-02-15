import React from "react";
import "./Navbar.css";
import getNavData from "./navData.js";

const Navbar = () => {
  
  function logout() {
    localStorage.setItem("loggedIn", false);
  }

  return (
    <nav id="navbar">
      <div className="logo">
        <p>🌍 Hackathon Global Inc.™</p>
      </div>
      <div className="nav_container">
        {getNavData(logout).map((item) => (
          <li key={item.id}>
            <a
              className="routes"
              href={item.link}
              onClick={() => {
                if (item.action) {
                  item.action();
                }
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
