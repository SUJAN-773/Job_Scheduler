const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
  },
  resume: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);

// books
