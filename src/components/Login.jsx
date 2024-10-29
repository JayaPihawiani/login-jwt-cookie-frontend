import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // variable
  const token = useSelector((state) => state.tokenData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // action

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/dashboard");
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
  // component
  return (
    <div className="container-fluid vh-100 bg-dark">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card">
          <div className="card-body">
            <h2>Login</h2>
            {err && <p className="text-danger text-center">{msg}</p>}
            <form onSubmit={submitLogin} className="d-flex flex-column">
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
                className="input-sty"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-success mt-4" type="submit">
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
            <p className="m-0 mt-2">
              Belum punya akun?{" "}
              <Link
                className="text-decoration-none fw-bold text-dark"
                to="/register"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
