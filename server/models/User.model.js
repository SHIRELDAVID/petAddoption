const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  phone: String,
  role: String,
  pets: Array,
  savedPets: Array
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
