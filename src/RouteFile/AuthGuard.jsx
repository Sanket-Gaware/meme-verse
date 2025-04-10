import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const user = localStorage.getItem("Token");

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
