import React, { useState, useEffect } from "react";
import "./Navbar.css";
import getNavData from "./navData.js"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logout() {
    localStorage.setItem("loggedIn", "false");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true"); 
  }, []);

  return (
    <nav id="navbar">
      <div className="nav_container">
        {getNavData(isLoggedIn, logout).map((item) => (
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
