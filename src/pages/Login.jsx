import React, { useState } from "react";
import api from "../components/api.js";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const handleLogin = () => {
    api
      .post("/pheduyet/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.access_token) {
          setUser({ token: response.access_token });
          nav("/About");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  return (
    <div className="form">
      <p className="form-title">Sign in to your account</p>

      <div className="input-container">
        <input
          placeholder="Enter username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>

      <div className="input-container">
        <input
          placeholder="Enter password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
      </div>

      <button className="submit" onClick={handleLogin}>
        Sign in
      </button>
      <p className="signup-link">
        No account? <a href="">Sign up</a>
      </p>
    </div>
  );
};

export default LoginForm;
