const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const passport = require("../passport");

router.get("/", function(req, res, next) {
  Post.find((err, result) => {
    if (err) {
      return next(err);
    }

    res.json(result);
  });
});

router.get("/:id", function(req, res, next) {
  Post.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }

    res.json(result);
  });
});

router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  const newPost = new Post({
    title: req.body.title,
    text: req.body.text,
    public: req.body.public === "public"
  });

  newPost.save((err, post) => {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

router.put("/:id", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      text: req.body.text,
      public: req.body.public === "public"
    },
    (err, post) => {
      if (err) {
        return next(err);
      }

      res.json(post);
    }
  );
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Post.findByIdAndDelete(req.params.id, (err, post) => {
      if (err) {
        return next(err);
      }

      res.json(post);
    });
  }
);

module.exports = router;
