require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("../passport");
const jwt = require("jsonwebtoken");

router.post("/", function(req, res, next) {
  console.log("started");
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(err);
    console.log(req.body.username);
    console.log(req.body.password);
    if (err || !user) {
      return res.status(400).json({
        message: "Something went wrong",
        user: user,
        info: info
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.json(err);
        return;
      }

      const token = jwt.sign({ user }, process.env.JWT_SEC);

      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
