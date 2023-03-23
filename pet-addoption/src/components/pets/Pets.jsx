import React from "react";
import { Grid } from "@mui/material";
import PetCard from "./PetCard";
import "./Pets.css";

const pets = [
  {
    name: "Firulais",
    image:
      "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
    status: "foster",
    description:
      "Firulais is a very friendly dog, he loves to play and he is very active. He is a very good dog and he is looking for a new home.",
    age: 2,
    type: "dog",
    breed: "labrador",
  },
  {
    name: "Pirulais",
    image:
      "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
    status: "foster",
    description:
      "Firulais is a very friendly dog, he loves to play and he is very active. He is a very good dog and he is looking for a new home.",
    age: 2,
    type: "dog",
    breed: "labrador",
  },
  {
    name: "Firulais",
    image:
      "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
    status: "foster",
    description:
      "Firulais is a very friendly dog, he loves to play and he is very active. He is a very good dog and he is looking for a new home.",
    age: 2,
    type: "dog",
    breed: "labrador",
  },
];
export default function Pets() {
  return (
    <Grid container spacing={3} className="pets">
      {pets.map((pet) => (
        <PetCard pet={pet}></PetCard>
      ))}
    </Grid>
  );
}
