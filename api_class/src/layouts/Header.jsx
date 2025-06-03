import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <nav className="space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
