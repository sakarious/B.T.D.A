//Express router
const router = require("express").Router();
//import frontend controlleer
const frontendController = require("../controllers/frontendTodoController");
const user = require("../controllers/frontendUserController");

router.get("/", (req, res) => {
  frontendController.homepage(req, res);
});

router.get("/create", user.isNotLoggedIn, (req, res) => {
  frontendController.createTodo(req, res);
});

router.post("/process", (req, res) => {
  user.isNotLoggedIn, frontendController.processTodo(req, res);
});

router.get("/all", (req, res) => {
  user.isNotLoggedIn, frontendController.getAll(req, res);
});

router.get("/view/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.getOne(req, res);
});

router.get("/update/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.updateTodo(req, res);
});

router.post("/updateTodo/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.processUpdateTodo(req, res);
});

router.get("/delete/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.deleteOne(req, res);
});

router.post("/delete/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.processDelete(req, res);
});

router.get("/done/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.complete(req, res);
});

router.post("/done/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.processComplete(req, res);
});

router.get("/completedtodos", (req, res) => {
  user.isNotLoggedIn, frontendController.getAllCompleted(req, res);
});

router.get("/viewcompleted/:uniqueId", (req, res) => {
  user.isNotLoggedIn, frontendController.getOneCompleted(req, res);
});

//USERS AUTH

router.get("/register", (req, res) => {
  user.isLoggedIn, user.register(req, res);
});

router.post("/registerUser", (req, res) => {
  user.isLoggedIn, user.processRegister(req, res);
});

router.get("/login", (req, res) => {
  user.isLoggedIn, user.login(req, res);
});

router.post("/loginUser", (req, res) => {
  user.isLoggedIn, user.processLogin(req, res);
});

module.exports = router;
