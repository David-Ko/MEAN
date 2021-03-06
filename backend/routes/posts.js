const express = require("express");

const router = express.Router();

const Post = require("../models/post");

router.post("", (req, res, next) => {
  // const post = req.body; // you can now use .body because of the bodyparse up above
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({ message: "Got your post", postId: createdPost._id });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful" });
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res
      .status(200)
      .json({ message: "Posts fetched succesffuly!", posts: documents });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => console.log(result));
  res.status(200).json({ message: "Post deleted" });
});

module.exports = router;
