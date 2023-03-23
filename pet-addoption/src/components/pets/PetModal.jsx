import { Button, Input } from "@mui/material";
import React from "react";
import "./PetModal.css";
import { Typography } from "@mui/material";
function PetModal({ pet }) {
  const { name, image, status, description, age, type, breed } = pet;

  return (
    <div className="petmodal">
      <Typography>name: {name}</Typography>
      <Typography>description: {description}</Typography>
      <Typography>type: {type}</Typography>
      <Typography>age: {age}</Typography>
      <Typography>breed: {breed}</Typography>

      <img src={image} />
      <Typography>status: {status}</Typography>
    </div>
  );
}
export default PetModal;
