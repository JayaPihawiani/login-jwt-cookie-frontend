import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosJWT from "../interceptors/axiosJWT";
import { refreshToken, reset } from "../slice/tokenSlice";
import NavBar from "./NavBar";

const Dashboard = () => {
  // variable
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.tokenData);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  // action
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    const handleRedirect = async () => {
      if (token && token.isError) {
        await dispatch(reset()); // Tunggu reset selesai
        setTimeout(() => {
          navigate("/login"); // Pindah ke login setelah reset selesai
        }, 50); // Tambahkan jeda kecil untuk memastikan sinkronisasi
      } else if (token && token.isSucces) {
        getData();
        setLoading(false);
      }
    };
    handleRedirect();
  }, [token, dispatch, navigate]);

  const getData = async () => {
    const acess = token.data.accessToken;
    const decoded = jwtDecode(acess);
    try {
      const response = await axiosJWT.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${acess}` },
      });
      setUser(response.data);
      setName(decoded.name);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="container-fluid vh-100 bg-dark"></div>
      ) : (
        <>
          <NavBar />
          <div className="container">
            <div className="row">
              <div className="col-12 mt-3">
                <h1>
                  Halloo <span className="h3">{name}</span>
                </h1>
                <p>Selamat datang kembali</p>
                <h4>Daftar user</h4>
                <table className="table table-striped mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((e, index) => (
                      <tr key={e.id}>
                        <td>{index + 1}.</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
