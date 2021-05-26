//import services
const todoServices = require("../services/todoServices");

module.exports = class frontendUserController {
  // Public stactic isLoggedIn (req, res, next) // For login and register
  static isLoggedIn(req, res, next) {
    console.log(req.session);
    if (req.session.isLoggedIn) {
      return res.redirect("/");
    } else {
      next();
    }
  }

  //Public static isNotLoggedIn (req, res, next) // For other endpoints
  static isNotLoggedIn(req, res, next) {
    console.log(req.session);
    if (!req.session.isLoggedIn) {
      return res.redirect("/login");
    } else {
      next();
    }
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

    if (response == false) {
      res.json({ status: "Failed", message: "User Already Exist" });
    } else {
      //Registration Successful
      console.log(response.email);
      console.log(response.password);
      req.session.isLoggedIn = true;
      req.session.email = response.email;
      req.session.password = response.password;
      res.redirect("/create");
    }
  }

  static login(req, res) {
    res.render("login", { title: "Login" });
  }

  static async processLogin(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let response = await todoServices.loginUser(email, password);

    if (response == false) {
      res.json({ status: "Failed", message: "User not found" });
    } else if (response == "Fake Credentials") {
      res.json({ status: "Incorrect username or password" });
    } else {
      //Login Successful
      req.session.isLoggedIn = true;
      req.session.email = response.userEmail;
      req.session.password = response.hashPassword;
      req.session.username = response.username;
      res.redirect("/create");
    }
  }

  static logout(req, res) {
    req.session.destroy(function(err) {
      if (!err) {
        res.redirect("/login");
      }
    })
  }
};
