const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const express = require("express");
const index = require("./routes");

//Access to the posts and comments handlers
const posts = index.posts;
const comments = index.comments;

let store = {
  posts: [
    {
      name: "Top 10 ES6 Features every Web Developer must know",
      url: "https://webapplog.com/es6",
      text:
        "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
      comments: [
        { text: "Cruel…..var { house, mouse} = No type optimization at all" },
        {
          text: "I think you’re undervaluing the benefit of ‘let’ and ‘const’."
        },
        { text: "(p1,p2)=>{ … } ,i understand this ,thank you !" }
      ]
    }
  ]
};

let app = express();
app.use(bodyParser.json());
app.use(errorHandler());

//Middleware allowing access to 'store' variable
app.use((req, res, next) => {
  req.store = store;
  next();
});

//Functions dealing with POSTS

// get all the posts
app.get("/posts", (req, res) => {
  posts.getPosts(req, res);
});
// add a post
app.post("/posts", (req, res) => {
  posts.addPost(req, res);
});
// update a post
app.put("/posts/:id", (req, res) => {
  posts.updatePost(req, res);
});
// delete a post
app.delete("/posts/:id", (req, res) => {
  posts.removePost(req, res);
});

//Functions dealing with COMMENTS

// get all comments on a post
app.get("/posts/:id/comments", (req, res) => {
  comments.getComments(req, res);
});
// add a comment to a post
app.post("/posts/:id/comments", (req, res) => {
  comments.addComment(req, res);
});
// edit comment on a post
app.put("/posts/:id/comments/:commentId", (req, res) => {
  comments.updateComment(req, res);
});
// delete a comment from a post
app.delete("/posts/:id/comments/:commentId", (req, res) => {
  comments.removeComment(req, res);
});

app.listen(3000);
