const bodyparser = require("body-parser");
const express = require("express");

const app = express();

const Post = require("../backend/models/post");
const mongoose = require("mongoose");

// app.use((req, res, next) => {
//   console.log("first middleware");
//   next();
// });
mongoose
  .connect(
    "mongodb+srv://dko:zvMGHbrLLIsKZ29r@mean-yhs4h.mongodb.net/test?retryWrites=true&w=majority"
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

app.post("/api/posts", (req, res, next) => {
  // const post = req.body; // you can now use .body because of the bodyparse up above
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({ message: "Got your post" });
});

app.get("/api/posts", (req, res, next) => {
  // res.send("Hello from Rebca");
  const posts = [
    {
      id: 1,
      title: "My first blog post",
      content: "There is 1 thing to read. Haha"
    },
    {
      id: 2,
      title: "My second blog post",
      content: "There is 2 things to read. Blahblah"
    },
    {
      id: 3,
      title: "My third blog post",
      content: "There is 3 things to read. Keke"
    },
    {
      id: 4,
      title: "My fourth blog post",
      content: "There is 4 things to read. Boooooo"
    }
  ];
  res.status(200).json({ message: "Posts fetched succesffuly!", posts: posts });
});

module.exports = app;
