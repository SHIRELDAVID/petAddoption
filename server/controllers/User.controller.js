const { User } = require("../models/User.model");
const sha256 = require("sha256");

const createUser = async ({ name, email, password, lastname, phone, role }) => {

  //password hashing
  hashedPassword = sha256(password);

  //create the user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    lastname,
    phone,
    role: role || 1,
  });

  user.save();
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  return user;
};

const updateUser = async (user) => {
  //hash the new password
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    ...user,
    password: user.password ? sha256(user.password) : undefined,
  });


  return { ...updatedUser?._doc, ...user, password: user.password ? sha256(user.password) : undefined, __v: undefined, $__: undefined, $isNew: undefined };
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  return user;
};

const getUsers = async () => {
  const users = await User.find();

  return users;
};

const getUserByName = async (name) => {
  const user = await User.find({ name });

  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.find({ email });

  return user;
};

const addPetToUser = async (userId, petId) => {
  console.log("userId", userId);
  const user = await getUserById(userId);
  console.log("user", user);

  return updateUser({ ...user, pets: [...user.pets, petId] });
};

const removePetFromUser = async (userId, petId) => {
  const user = await getUserById({ userId })[0];
  const pets = user.pets;

  const newPets = pets.filter((pet) => pet != petId);

  return updateUser({ ...user, pets: newPets });
};

const saveForLater = async (userId, petId) => {
  console.log(userId)
  const user = await getUserById(userId);
  const savedPets = user.savedPets;

  await User.findByIdAndUpdate(userId, { savedPets: [...savedPets, petId] })
};

const unsaveForLater = async (userId, petId) => {
  const user = await getUserById(userId);

  const savedPets = user.savedPets;

  await User.findByIdAndUpdate(userId, { savedPets: savedPets.filter((pet) => pet != petId) })
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  addPetToUser,
  removePetFromUser,
  saveForLater,
  unsaveForLater,
};
