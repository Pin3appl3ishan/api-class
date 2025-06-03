import { NavLink, useNavigate, Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const returnToHomepage = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-4 text-center">
        <h1>Login Page</h1>
        <NavLink to="/">Go back</NavLink>
        <Link to="/register">Register</Link>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={returnToHomepage}
        >
          Button click
        </button>
        <button
          onClick={(event) => {
            returnToHomepage(event);
          }}
        >
          Button Click Callback
        </button>
      </div>
    </div>
  );
};

export default Login;
