//Express router
const router = require("express").Router();
//import frontend controlleer
const frontendController = require("../controllers/frontendTodoController");
const auth = require("../controllers/frontendAuthController");

router.get("/", (req, res) => {
  frontendController.homepage(req, res);
});

router.get("/create", auth.isNotLoggedIn, (req, res) => {
  frontendController.createTodo(req, res);
});

router.post("/process", auth.isNotLoggedIn, (req, res) => {
  frontendController.processTodo(req, res);
});

router.get("/all", auth.isNotLoggedIn, (req, res) => {
  frontendController.getAll(req, res);
});

router.get("/view/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.getOne(req, res);
});

router.get("/update/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.updateTodo(req, res);
});

router.post("/updateTodo/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.processUpdateTodo(req, res);
});

router.get("/delete/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.deleteOne(req, res);
});

router.post("/delete/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.processDelete(req, res);
});

router.get("/done/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.complete(req, res);
});

router.post("/done/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.processComplete(req, res);
});

router.get("/completedtodos", auth.isNotLoggedIn, (req, res) => {
  frontendController.getAllCompleted(req, res);
});

router.get("/viewcompleted/:uniqueId", auth.isNotLoggedIn, (req, res) => {
  frontendController.getOneCompleted(req, res);
});

//USERS AUTH

router.get("/register", auth.isLoggedIn, (req, res) => {
  auth.register(req, res);
});

router.post("/registerUser", auth.isLoggedIn, (req, res) => {
  auth.processRegister(req, res);
});

router.get("/login", auth.isLoggedIn, (req, res) => {
  auth.login(req, res);
});

router.post("/loginUser", auth.isLoggedIn, (req, res) => {
  auth.processLogin(req, res);
});

router.get("/logout", (req, res) => {
  auth.logout(req, res);
});

module.exports = router;
