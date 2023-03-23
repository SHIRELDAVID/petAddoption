import React, { useState } from "react";
import { Button, Typography, Grid, Modal } from "@mui/material";
import "./PetCard.css";
import PetModal from "./PetModal";
export default function PetCard({ pet }) {
  const { name, image, status } = pet;

  const moreDetails = () => {};
  const [open, setOpen] = useState(false);

  return (
    <>
      <Grid item xs={6} md={4} lg={3} xl={2}>
        <Typography>name: {name}</Typography>
        <img src={image} />
        <Typography>status: {status}</Typography>
        <Button onClick={() => setOpen(true)}>see more</Button>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <PetModal pet={pet} />
      </Modal>
    </>
  );
}
