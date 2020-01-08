const express = require("express");
const massive = require("massive");
const users = require("./controllers/users");
const posts = require("./controllers/posts");
const comments = require("./controllers/comments");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

massive({
  host: "localhost",
  port: 5432,
  database: "node3",
  user: "postgres",
  password: "node3db"
}).then(db => {
  const app = express();

  app.set("db", db);
  app.use(express.json());

  const auth = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  };

  //   USERS ENDPOINTS
  app.post("/api/users", users.create);
  app.get("/api/users", auth, users.list);
  app.get("/api/users/:id", auth, users.getById);
  app.get("/api/users/:id/profile", auth, users.getProfile);

  // LOGIN
  app.post("/api/login", auth, users.login);
  app.get("/api/login", auth, users.loginList);

  //POSTS ENDPOINTS
  app.post("/api/posts/:userId", auth, posts.create);
  app.get("/api/posts", auth, posts.allPosts);
  app.get("/api/posts/:id/comments", auth, posts.viewPostByPostId);
  app.get("/api/users/:userId/posts", auth, posts.viewPostsByUserId);
  app.patch("/api/posts/:postId", auth, posts.updatePost);

  //COMMENTS ENDPOINTS
  app.post("/api/comments/:userId/:postId", auth, comments.create);
  app.patch("/api/comments/:commentId", auth, comments.updateComment);

  const PORT = 3005;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
