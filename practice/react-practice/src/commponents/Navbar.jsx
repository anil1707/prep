import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/action";
import { logout } from "../redux/actionCreator";

const Navbar = () => {
    // const {userDetail, logout} = useUserContext()
    const userData = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const isLoggedin = userData?.isLoggedin ? true : false

    const handleLogout = () => {
      // logout();
      dispatch(logout())
    }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1px 40px",
        background: "#282c34",
        color: "#fff",
      }}
    >
      <h2>Prep</h2>

      {isLoggedin ? <div style={{ display: "flex", gap: "20px" }}>
        <Link style={linkStyle} to="/">
          Home
        </Link>

        <Link style={linkStyle} to="/about">
          About
        </Link>

        <Link style={linkStyle} to="/contact">
          Contact
        </Link>

        <Link style={linkStyle} to="/dashboard">
          Dashboard
        </Link>
        <button style={{...linkStyle, ...buttonStyle}} onClick={handleLogout}> Logout </button>
      </div> : <Link style={linkStyle}>Login</Link>}
    </nav>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

const buttonStyle = {
  background: "black"
}

export default Navbar;