import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Login from "./Login";
import Signup from "./Signup";
import ProfileDetails from "./ProfileDetails";
import AddPet from "./AddPet";
export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [profileDetailsOpen, setProfileDetailsOpen] = useState(false);
  const [addPetOpen, setAddPetOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        Adopt a PET
      </Link>
      <div className="navbar__links">
        {isLoggedIn && (
          <Link className="navbar__link" to="/mypets">
            My Pets
          </Link>
        )}
        {isLoggedIn && JSON.parse(localStorage.getItem("user"))?.role == 2 && (
          <Link className="navbar__link" to="/dashboard">
            Dashboard
          </Link>
        )}
        {isLoggedIn && JSON.parse(localStorage.getItem("user"))?.role == 2 && (
          <p className="navbar__link" onClick={() => setAddPetOpen(true)}>
            Add pet
          </p>
        )}
        {isLoggedIn && (
          <p
            className="navbar__link navbar__link-btn"
            onClick={() => setProfileDetailsOpen(true)}
          >
            {JSON.parse(localStorage.getItem("user"))?.name}
          </p>
        )}
        {isLoggedIn && (
          <p className="navbar__link" onClick={() => Logout()}>
            Logout
          </p>
        )}
      </div>
      <div className="navbar__profile">
        {!isLoggedIn && (
          <p
            className="navbar__link navbar__link-btn"
            onClick={() => setLoginModalOpen(true)}
          >
            Login
          </p>
        )}
        {!isLoggedIn && (
          <p
            className="navbar__link navbar__link-btn"
            onClick={() => setSignupModalOpen(true)}
          >
            Sign up
          </p>
        )}
      </div>

      <Modal
        isOpen={loginModalOpen}
        setIsOpen={setLoginModalOpen}
        Comp={Login}
      />
      <Modal
        isOpen={signupModalOpen}
        setIsOpen={setSignupModalOpen}
        Comp={Signup}
      />
      <Modal
        isOpen={profileDetailsOpen}
        setIsOpen={setProfileDetailsOpen}
        Comp={ProfileDetails}
      />
      <Modal isOpen={addPetOpen} setIsOpen={setAddPetOpen} Comp={AddPet} />
    </div>
  );
}
