const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: String,
  age: Number,
  species: String,
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
