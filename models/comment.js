const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const comment = new Schema({
  username: { type: String, required: true, min: 4, max: 10 },
  text: { type: String, required: true, max: 200 },
  time: { type: Date, required: true, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true }
});

comment.virtual("formattedDate").get(function() {
  return moment(this.time).format("h:mm:ss a");
});

module.exports = mongoose.model("Comment", comment);
