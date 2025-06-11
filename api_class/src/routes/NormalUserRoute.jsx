import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";


export const NormalUserRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <>Loading</>;

  if (!user) return <Navigate to="login" replace />; // replace will not save history

  if (user.role !== "normal") return <Navigate to="/" replace />;

  return <Outlet />;
};
