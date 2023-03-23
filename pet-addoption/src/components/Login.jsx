import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";

function Login({ setIsOpen }) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const [feedback, setFeedback] = useState({
    color: "green",
    content: "",
  });
  const handleLogin = async () => {
    try {
      console.log(formData);
      const res = await axios.post(
        "http://localhost:8080/user/login",
        formData
      );
      setFeedback({
        color: "green",
        content: "logged in successfully.",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.reload();
    } catch (err) {
      setFeedback({
        color: "red",
        content: err.response.data?.message,
      });
    }
  };

  const [formData, setFormData] = useState({});

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="login__card">
      <span onClick={() => setIsOpen(false)}>x</span>
      <div className="card__top">
        <h2>Login</h2>
      </div>
      <div className="card__content">
        <input
          className="card__input"
          onChange={(e) => handleFormChange(e)}
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <input
          className="card__input"
          onChange={(e) => handleFormChange(e)}
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button className="card__btn" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
      <p style={{ color: feedback.color }} className="card__feedback">
        {feedback.content}
      </p>
    </div>
  );
}

export default Login;
