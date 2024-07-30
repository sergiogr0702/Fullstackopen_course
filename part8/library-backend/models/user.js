const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username field is required"],
    unique: [true, "The username must be unique"],
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: [true, "Favorite genre field is required"],
  },
});

module.exports = mongoose.model("User", schema);
