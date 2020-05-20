const routes = require("express").Router();
const auth = require("./controllers/authController");
const posts = require("./controllers/postController");
const comments = require("./controllers/commController");

const notImplemented = (req, res) => {
  res.status(501).json({});
};

// import controller files here
// const controler = require('controller')
/*
  Mounting Routes:

  When mounting routes, we can use the following methods on object 'routes':
  routes.get,
  routes.post,
  routes.put,
  routes.delete,
  routes.use

  like so: routes.[method]('/path',[...middleware],function endpoint(){})
  ex: routes.get('/user',controller.getUser)
  
  whatever path is used above is concatenated with the path
  specified in app.use('/path',routes) such that:

  file /index.js:
  given that 'routes' is mounted at path '/api':  
  app.use('/api',routes)

  file /routes.js:
  routes.get('/user',controller.getUser) 
  is accessible at '/api/user'
*/
// auth endpoints
routes.post("/auth/login", auth.login);
routes.post("/auth/register", auth.register);
routes.post("/auth/logout", auth.logout);
routes.put("/auth/user/:id", auth.editUser);

routes.get("/", function helloApi(req, res) {
  res.send("hello from api");
});
/* post endpoints */
// get all posts
routes.get("/posts", posts.getAllPosts);
// get post by id
routes.get("/posts/:id", posts.getPost);
// update post by id
routes.put("/posts/:id", posts.editPost);
// create post
routes.post("/post", posts.createPost);
// delete a post by id
routes.delete("/post/:id", posts.deletePost);

/* comment endpoints */ 
routes.post('/api/comments', comments.createComment);
routes.get('/api/post/comments/:id', comments.getPostComments);
routes.put('/api/comments/:id', comments.editUserComment);
routes.get('/api/comments/:id', comments.getUserComments);
routes.delete('/api/comments/:id', comments.deleteUserComment);

// index.js expects object routes as the default export
module.exports = routes;
