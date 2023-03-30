const mongoose = require("mongoose");

const stuffSchema = new mongoose.Schema({
    name: String,
    role: String,
    image: String
});

const Stuff = mongoose.model("stuff", stuffSchema);

module.exports = {
    Stuff,
};
