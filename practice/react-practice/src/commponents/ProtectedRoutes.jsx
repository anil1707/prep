import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    // const {userDetail} = useUserContext()
    const userData = useSelector(state => state.auth)
    // const isLoggedin = userData?.isLoggedIn ? true : false


    const isLoggedin = true

  const isAuthenticated = isLoggedin ? true : false; // Replace with real auth

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;