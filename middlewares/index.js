// TODO organised the middleware to have its own file. Just like the route .

// TODO add a rate limiter to this application
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

module.exports = (app) => {

  app.use(
    session({
      secret: "Sakarious Da Genius",
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use(helmet());

  // view Engine
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  //  apply to all requests
  app.use(limiter);
};
