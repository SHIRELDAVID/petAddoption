import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <h2 className="header__text">Come and find your next love</h2>
        <Link className="header__link" to="/searchpet">
          Search a pet
        </Link>
      </div>
      <div className="header__img"></div>
    </div>
  );
}

export default Header;
