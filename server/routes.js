const routes = require("express").Router();
const auth = require("./controllers/auth");

const noOp = (req, res) => {
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

routes.get("/", function helloApi(req, res) {
  res.send("hello from api");
});
/* post endpoints */
// get all posts
routes.get("/posts", noOp);
routes.get("/post/", noOp);
// index.js expects object routes as the default export
module.exports = routes;
