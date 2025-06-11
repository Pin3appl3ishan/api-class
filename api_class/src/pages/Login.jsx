import { NavLink, useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const Login = () => {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();

  const returnToHomepage = (event) => {
    event.preventDefault();
    navigate("/");
  };

  // If user is logged in, show "you are already logged in"
  if (user) {
    return <div>You are already logged in.</div>;
  }

  return (
    <div>
      <div>
        <h1>Login</h1>
        <NavLink to="/">Go back</NavLink>
        <Link to="/register">Register</Link>
        <button onClick={returnToHomepage}>Button click</button>
        <button
          onClick={(event) => {
            returnToHomepage(event);
          }}
        >
          Button Click Callback
        </button>

        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
