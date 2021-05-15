const todoRoute = require('./todoRoutes');
const frontendRoute = require('./frontendRoute')

module.exports = (app) => {

  app.use('/', frontendRoute);

  app.use('/v1/todos', todoRoute);

  app.use('/health', (req, res) => {
    res.send("I'm in a good working condition");
  });

}



// Route
// middleware use function with route pattern and handler
// http verb of the express function
// middleware use function with route pattern and exported router module


// User Module
// Post Module

// /users => all user
// /users/:id => particular user /users/ade

// /posts => all user
// /posts/:id => particular post
