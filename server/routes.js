const routes = require("express").Router();
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
routes.get("/", function helloApi(req, res) {
  res.send("hello from api");
});
// index.js expects object routes as the default export
module.exports = routes;
