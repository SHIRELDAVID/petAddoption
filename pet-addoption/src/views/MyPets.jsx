import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PetsList from "../components/PetsList";
import StatusFilter from "../components/StatusFilter";
import "./MyPets.css";

function MyPets() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const [ownerSwitch, setOwnerSwitch] = useState(false)
  return (
    <div>
      <NavBar />
      <StatusFilter ownerSwitch={ownerSwitch} setOwnerSwitch={setOwnerSwitch} />
      <PetsList ownerSwitch={ownerSwitch} owner={true} />
    </div>
  );
}

export default MyPets;
