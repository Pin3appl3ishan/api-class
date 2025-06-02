import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const returnToHomepage = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
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
    </div>
  );
};

export default Login;
