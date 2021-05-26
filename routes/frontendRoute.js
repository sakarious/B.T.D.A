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

router.post("/process", user.isNotLoggedIn, (req, res) => {
  frontendController.processTodo(req, res);
});

router.get("/all", user.isNotLoggedIn, (req, res) => {
  frontendController.getAll(req, res);
});

router.get("/view/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.getOne(req, res);
});

router.get("/update/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.updateTodo(req, res);
});

router.post("/updateTodo/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.processUpdateTodo(req, res);
});

router.get("/delete/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.deleteOne(req, res);
});

router.post("/delete/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.processDelete(req, res);
});

router.get("/done/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.complete(req, res);
});

router.post("/done/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.processComplete(req, res);
});

router.get("/completedtodos", user.isNotLoggedIn, (req, res) => {
  frontendController.getAllCompleted(req, res);
});

router.get("/viewcompleted/:uniqueId", user.isNotLoggedIn, (req, res) => {
  frontendController.getOneCompleted(req, res);
});

//USERS AUTH

router.get("/register", user.isLoggedIn, (req, res) => {
  user.register(req, res);
});

router.post("/registerUser", user.isLoggedIn, (req, res) => {
  user.processRegister(req, res);
});

router.get("/login", user.isLoggedIn, (req, res) => {
  user.login(req, res);
});

router.post("/loginUser", user.isLoggedIn, (req, res) => {
  user.processLogin(req, res);
});


router.get('/logout', (req, res) => {
  user.logout(req, res)
})

module.exports = router;
