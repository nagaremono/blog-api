require("dotenv").config();
const mongoose = require("mongoose");
const Author = require("./models/author");
const bcrypt = require("bcryptjs");

const mongoDB = process.env.DB_DEV;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

bcrypt.hash(process.env.AUTH_PS, 10, (err, hashedPassword) => {
  if (err) {
    console.log(err);
    return;
  }

  const author = new Author({
    username: "textual",
    password: hashedPassword
  });

  author.save(err => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
});
