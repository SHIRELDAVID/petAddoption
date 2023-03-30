const User = require("../services/firebase")
const sha256 = require("sha256");

const createUser = async ({ name, email, password, lastname, role }) => {

  //password hashing
  hashedPassword = sha256(password);

  //create the user
  const user = await User.add({
    name,
    email,
    password: hashedPassword,
    lastname,
    role: role || "1",
    pets: [],
    savedPets: []
  })
  return user;
};

const getUserById = async (userId) => {
  const users = await getUsers()
  return users.filter(user => user._id === userId)
};

const updateUser = async (user) => {
  //hash the new password
  if (user.password) user = { ...user, password: sha256(user.password) }
  const selectedUser = User.doc(user._id)
  selectedUser.update({
    ...user
  })
  const updatedUser = await getUserById(user._id)
  return updatedUser[0];
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  return user;
};

const getUsers = async () => {
  const res = await User.get()
  let users = []
  res.forEach(doc => {
    users.push({ ...doc.data(), _id: doc.id })
  })
  return users;
};

const getUserByName = async (name) => {
  const users = await getUsers()
  return users.filter(user => user.name === name)
};

const getUserByEmail = async (email) => {
  const users = await getUsers()
  return users.filter(user => user.email === email)

};

const addPetToUser = async (userId, petId) => {
  console.log("userId", userId);
  const user = await getUserById(userId)[0]
  console.log("user", user);

  return updateUser({ ...user, pets: [...user.pets, petId] });
};

const removePetFromUser = async (userId, petId) => {
  const user = await getUserById(userId)[0];
  const pets = user.pets;

  const newPets = pets.filter((pet) => pet != petId);

  return updateUser({ ...user, pets: newPets });
};

const saveForLater = async (userId, petId) => {
  const user = await getUserById(userId);
  console.log(user[0])
  const savedPets = user[0].savedPets;

  await updateUser({ _id: user[0]._id, savedPets: [...savedPets, petId] })
};

const unsaveForLater = async (userId, petId) => {
  const user = await getUserById(userId)[0];

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
