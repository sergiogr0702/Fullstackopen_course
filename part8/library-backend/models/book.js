const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title field is required"],
    unique: [true, "The title must be unique"],
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Book", schema);
