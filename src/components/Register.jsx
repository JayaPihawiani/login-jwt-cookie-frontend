import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/user", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setErr(true);
      const message = error.response.data.msg;
      setMsg(message);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 bg-dark">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card">
          <div className="card-body">
            <h2>Login</h2>
            <form onSubmit={registerUser} className="d-flex flex-column">
              {err && <p className="text-danger text-center">{msg}</p>}
              <label className="form-label m-0 fw-bold">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="input-sty mb-2"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="form-label m-0 fw-bold">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                className="input-sty mb-2"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label m-0 fw-bold">Password</label>
              <input
                type="text"
                placeholder="Enter password"
                className="input-sty mb-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label m-0 fw-bold">
                Konirmasi password
              </label>
              <input
                type="text"
                placeholder="Enter password again"
                className="input-sty"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              <button className="btn btn-success mt-4">
                {loading ? "Loading..." : "Register"}
              </button>
            </form>
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
