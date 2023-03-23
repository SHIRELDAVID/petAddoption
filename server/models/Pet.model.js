const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  status: {
    type: String,
    default: "available"
  },
  bio: String,
  image: String,
  height: Number,
  weight: Number,
  color: String,
  hypoallergenic: {
    type: Boolean,
    default: false
  },
  dietaryRestrictions: String,
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = {
  Pet,
};
