import React from "react";
import {NavLink} from 'react-router-dom';

function Navbar() {
  const isActive = (e) => {
    return `${e.isActive && "sidebar-link-active"} sidebar-link`;
  };
  return (
    <nav className="nav">
      <h1 className="nav-heading">Welcome</h1>
      <ul>
        <li>
          <NavLink className={isActive} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={isActive} to="/statistics">
            Statistics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
