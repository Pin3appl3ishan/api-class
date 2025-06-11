import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <div className="container mx-auto">
        <nav className="space-x-4">
          <NavLink to="/">Home</NavLink>
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register">Register</Link>
            </>
          )}
          {
            user && (
              <>
              Welcome {user.email}
              <NavLink onClick={logout}> Logout</NavLink>
              </>
            )
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
