const express = require("express");
const {
  createPet,
  getPetById,
  updatePet,
  deletePet,
  getPets,
} = require("../controllers/Pet.controller");

const {
  adoptPet,
  fosterPet,
  returnPet,
  getUserPets,
} = require("../services/PetAdoption.service");
const { Pet } = require("../models/Pet.model");
const authMiddleware = require("../middlewares/authMiddleware");
const validationSchema = require("../middlewares/validationMiddleware");
const router = express.Router();

// Create pet
router.post("/create", [authMiddleware, validationSchema], async (req, res) => {

  const fields = req.body;

  const pet = await createPet(fields);

  res.status(200).json(pet);
});

router.get("/getById/:id", async (req, res) => {
  const { id } = req.params;

  const pet = await getPetById(id);

  res.status(200).json(pet);
});

router.post(
  "/updatePet/:id",
  [authMiddleware, validationSchema],
  async (req, res) => {
    const { id } = req.params;

    const updateFields = req.body;

    const pet = await updatePet({ id, updateFields });

    res.status(200).json(pet);
  }
);

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  if (req.user.role != 2)
    return res.status(401).json({ message: "Access denied." });
  const { id } = req.params;

  const pet = await Pet.findByIdAndDelete(id);

  res.status(200).json(pet);
});

router.get("/getAll", async (req, res) => {
  const pets = await getPets();

  res.status(200).json(pets);
});

router.post("/adopt", [authMiddleware, validationSchema], async (req, res) => {
  const { petId } = req.body;

  await adoptPet({ petId, userId: req.user._id });

  res.status(200).json({ message: "Pet adopted" });
});

router.post("/foster", [authMiddleware, validationSchema], async (req, res) => {
  const { petId } = req.body;

  await fosterPet({ petId, userId: req.user._id });

  res.status(200).json({ message: "Pet fostered" });
});

router.post("/return", [authMiddleware, validationSchema], async (req, res) => {
  const { petId } = req.body;

  await returnPet({ petId, userId: req.user._id });

  res.status(200).json({ message: "Pet returned" });
});

router.get(
  "/getUserPets/:id",
  [authMiddleware, validationSchema],
  async (req, res) => {
    const { id } = req.params;

    const pets = await getUserPets(id);

    res.status(200).json(pets);
  }
);

module.exports = router;
