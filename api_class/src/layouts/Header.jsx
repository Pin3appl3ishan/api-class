import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <nav className="space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <Link to="/login">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
