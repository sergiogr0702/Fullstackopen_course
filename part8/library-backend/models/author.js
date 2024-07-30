const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    unique: [true, "The name must be unique"],
    minlength: 4,
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("Author", schema);
