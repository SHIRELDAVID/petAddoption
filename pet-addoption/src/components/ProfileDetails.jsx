import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Login.css";

function ProfileDetails({ setIsOpen, options }) {
  const userData = options?.userData || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
    setFormData({
      ...Object.fromEntries(
        Object.entries(userData).filter(
          ([key]) =>
            !key.includes("_id") &&
            !key.includes("role") &&
            !key.includes("password") &&
            !key.includes("__v")
        )
      ),
    });
  }, []);

  const handleProfileChange = async () => {
    try {
      console.log(formData);
      const res = await axios.put(
        `http://localhost:8080/user/update/${userData._id}`,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data))
      setFeedback({
        color: "green",
        content: "profile updated successfully.",
      });
    } catch (err) {
      setFeedback({
        color: "red",
        content: err.response.data?.message,
      });
    }
  };

  const [feedback, setFeedback] = useState({
    color: "green",
    content: "",
  });

  const [formData, setFormData] = useState({});

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="login__card">
      <span onClick={() => setIsOpen(false)}>x</span>
      <div className="card__top">
        <h2>Profile Details</h2>
      </div>
      <div className="card__content">
        <input
          className="card__input"
          name="name"
          value={formData.name}
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="first name"
          required
        />
        <input
          className="card__input"
          name="lastname"
          value={formData.lastname}
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="last name"
          required
        />
        <input
          className="card__input"
          name="email"
          value={formData.email}
          onChange={(e) => handleFormChange(e)}
          type="email"
          placeholder="email"
          required
        />
        <input
          className="card__input"
          name="password"
          onChange={(e) => handleFormChange(e)}
          type="password"
          placeholder="new password"
          required
        />
        <button className="card__btn" onClick={() => handleProfileChange()}>
          Save Changes
        </button>
      </div>
      <p style={{ color: feedback.color }} className="card__feedback">
        {feedback.content}
      </p>
    </div>
  );
}

export default ProfileDetails;
