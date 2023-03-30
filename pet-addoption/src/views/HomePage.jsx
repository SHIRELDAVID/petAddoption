import { Button, Link, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import Pets from "../components/pets/Pets";
import SearchBar from "../components/SearchBar";
import Signup from "../components/Signup";

import StuffCarousel from "../components/StuffCarousel"

export default function HomePage() {
  const [open, setOpen] = useState("");
  return (
    <div>
      <NavBar />
      <Header />
      <br />
      <br />
      <h3>Stuff</h3>
      <StuffCarousel />

    </div>
  );
}
