const {
  addPetToUser,
  removePetFromUser,
} = require("../controllers/User.controller");
const { updatePetStatus } = require("../controllers/Pet.controller");
const { User } = require("../models/User.model");
const { Pet } = require("../models/Pet.model");

const adoptPet = async ({ userId, petId }) => {
  const user = await User.findById(userId)
  await User.findByIdAndUpdate(userId, { pets: [...user.pets, petId] })
  await Pet.findByIdAndUpdate(petId, { status: "adopted" })
};

const fosterPet = async ({ userId, petId }) => {
  const user = await User.findById(userId)
  await User.findByIdAndUpdate(userId, { pets: [...user.pets, petId] })
  await Pet.findByIdAndUpdate(petId, { status: "fostered" })
};

const returnPet = async ({ userId, petId }) => {
  const user = await User.findById(userId)
  await User.findByIdAndUpdate(userId, { pets: [...user.pets.filter(pet => pet !== petId)] })
  await Pet.findByIdAndUpdate(petId, { status: "available" })
};

const getUserPets = async (userId) => {
  const user = await getUserById(userId)[0];

  const pets = user.pets;

  // Get pets by pets ids from pets array
  const userPets = await Promise.all(
    pets.map(async (petId) => {
      const pet = await getPetById(petId)[0];
      return pet;
    })
  );

  return userPets;
};

module.exports = {
  adoptPet,
  fosterPet,
  returnPet,
  getUserPets,
};
