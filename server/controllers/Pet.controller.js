const { Pet } = require("../models/Pet.model");
const multer = require("multer");
const path = require("path");

const createPet = async (fields) => {

  const pet = new Pet({
    ...fields,
  });

  pet.save();
  return pet;
};

const getPetById = async (id) => {
  const pet = await Pet.findById(id);

  return pet;
};

const updatePet = async ({ id, updateFields }) => {
  const pet = await Pet.findByIdAndUpdate(id, {
    ...updateFields,
  });

  return pet;
};

const deletePet = async ({ id }) => {
  const pet = await Pet.findByIdAndDelete(id);

  return pet;
};

const getPets = async () => {
  const pets = await Pet.find();

  return pets;
};

const updatePetStatus = async (status, id) => {
  return Pet.findByIdAndUpdate(id, { status })
};

module.exports = {
  createPet,
  updatePet,
  deletePet,
  getPets,
  getPetById,
  updatePetStatus,
};
