import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../slice/tokenSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.delete("http://localhost:5000/api/logout");
      navigate("/login", { replace: true });
      dispatch(reset());
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <div className="d-flex align-items-center">
          <Link
            className="navbar-brand text-decoration-none text-light"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link className="text-decoration-none text-light" to="#home">
            Home
          </Link>
        </div>
        <button className="btn btn-light" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
