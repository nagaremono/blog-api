const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const author = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Author", author);
