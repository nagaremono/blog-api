const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const post = new Schema({
  title: { type: String, min: 10, required: true },
  text: { type: String, min: 10, required: true },
  time: { type: Date, required: true, default: Date.now },
  public: { type: Boolean, required: true }
});

post.virtual("formattedTime").get(function() {
  return moment(this.time).format("dd mm yyyy h:mm:ss a");
});

module.exports = mongoose.model("Post", post);
