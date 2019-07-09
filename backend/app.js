const bodyparser = require("body-parser");
const express = require("express");

const app = express();

const Post = require("../backend/models/post");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");

// app.use((req, res, next) => {
//   console.log("first middleware");
//   next();
// });
mongoose
  .connect(
    "mongodb+srv://dko:zvMGHbrLLIsKZ29r@mean-yhs4h.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to database!"))
  .catch(() => console.log("Connection Failed"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested_With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

// app.post("/api/posts", (req, res, next) => {
//   // const post = req.body; // you can now use .body because of the bodyparse up above
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   console.log(post);
//   post.save().then(createdPost => {
//     console.log(createdPost);
//     res.status(201).json({ message: "Got your post", postId: createdPost._id });
//   });
// });

// app.put("/api/posts/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({ _id: req.params.id }, post).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Update successful" });
//   });
// });

// app.get("/api/posts", (req, res, next) => {
//   Post.find().then(documents => {
//     console.log(documents);
//     res
//       .status(200)
//       .json({ message: "Posts fetched succesffuly!", posts: documents });
//   });
//   // res.send("Hello from Rebca");
//   // const posts = [
//   //   {
//   //     id: 1,
//   //     title: "My first blog post",
//   //     content: "There is 1 thing to read. Haha"
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "My second blog post",
//   //     content: "There is 2 things to read. Blahblah"
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "My third blog post",
//   //     content: "There is 3 things to read. Keke"
//   //   },
//   //   {
//   //     id: 4,
//   //     title: "My fourth blog post",
//   //     content: "There is 4 things to read. Boooooo"
//   //   }
//   // ];
// });

// app.get("/api/posts/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   });
// });

// app.delete("/api/posts/:id", (req, res, next) => {
//   console.log(req.params.id);
//   Post.deleteOne({ _id: req.params.id }).then(result => console.log(result));
//   res.status(200).json({ message: "Post deleted" });
// });

module.exports = app;
