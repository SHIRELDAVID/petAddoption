
const { Pet } = require("../models/Pet.model");
const { updateUser, getUserById } = require("../controllers/User.controller");

const adoptPet = async ({ userId, petId }) => {
  const user = await getUserById(userId)
  console.log(user)
  await updateUser({ _id: userId, pets: [...user[0].pets, petId] })
  await Pet.findByIdAndUpdate(petId, { status: "adopted" })
};

const fosterPet = async ({ userId, petId }) => {
  const user = await getUserById(userId)
  await updateUser({ _id: userId, pets: [...user[0].pets, petId] })
  await Pet.findByIdAndUpdate(petId, { status: "fostered" })
};

const returnPet = async ({ userId, petId }) => {
  const user = await getUserById(userId)
  await updateUser({ _id: userId, pets: [...user[0].pets.filter(pet => pet !== petId)] })
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
