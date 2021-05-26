//import services
const todoServices = require("../services/todoServices");

module.exports = class frontendUserController {
  // Public stactic isLoggedIn (req, res, next) // For login and register
  static isLoggedIn(req, res, next) {
    if (req.session.isLoggedIn && req.session.email.length != 0) {
      return res.render("create", { title: "Create Todo" });
    }
    next();
  }

  //Public static isNotLoggedIn (req, res, next) // For other endpoints
  static isNotLoggedIn(req, res, next) {
    if (!req.session.isLoggedIn) {
      return res.render("login", { title: "Login" });
    }
    next();
  }

  //Register
  static register(req, res) {
    res.render("register", { title: "Register" });
  }

  //Process Register i.e Add user to db
  static async processRegister(req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let response = await todoServices.createUser(
      firstname,
      lastname,
      username,
      email,
      password
    );

    res.json({ response });
  }
};
