import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Menu.css";

function Menu() {

  return (
    <>
      <input
        className="menu-icon"
        type="checkbox"
        id="menu-icon"
        name="menu-icon"
      />
      <label htmlFor="menu-icon"></label>
      <div className="label-bg"></div>
      <nav className="nav">
        <ul className="pt-5">
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/anime">Anime Gifs</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
