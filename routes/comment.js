const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.get("/", function(req, res, next) {
  Comment.find((err, result) => {
    if (err) {
      return next(err);
    }

    res.json(result);
  });
});

router.get("/:id", function(req, res, next) {
  Comment.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }

    res.json(result);
  });
});

router.post("/", function(req, res, next) {
  const newComment = new Comment({
    username: req.body.username,
    text: req.body.username,
    post: req.body.post
  });

  newComment.save((err, comment) => {
    if (err) {
      return next(err);
    }

    res.json(comment);
  });
});

router.put("/:id", function(req, res, next) {
  Comment.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      text: req.body.username,
      post: req.body.post
    },
    (err, comment) => {
      if (err) {
        return next(err);
      }

      res.json(comment);
    }
  );
});

router.delete("/:id", function(req, res, next) {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) {
      return next(err);
    }

    res.json(comment);
  });
});

module.exports = router;
