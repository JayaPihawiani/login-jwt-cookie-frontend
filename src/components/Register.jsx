import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container-fluid vh-100 bg-dark">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card">
          <div className="card-body d-flex flex-column">
            <h2>Login</h2>
            <label className="form-label m-0 fw-bold">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="input-sty mb-2"
            />
            <label className="form-label m-0 fw-bold">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="input-sty mb-2"
            />
            <label className="form-label m-0 fw-bold">Password</label>
            <input
              type="text"
              placeholder="Enter password"
              className="input-sty"
            />
            <button className="btn btn-success mt-4">Register</button>
            <p className="m-0 mt-2">
              Sudah punya akun?{" "}
              <Link
                className="text-decoration-none fw-bold text-dark"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
