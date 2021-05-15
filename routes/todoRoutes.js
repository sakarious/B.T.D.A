//Express router
const router = require('express').Router();
//import todo controlleer
const TodoController = require('../controllers/todoController')

/**
 *  Get all Todos
 */
router.get('/', (req, res) => {

  TodoController.getAllTodos(req, res)

})


/**
 *  Add a Todo
 */
router.post('/', (req, res) => {

  TodoController.createTodo(req, res)

})


/**
 *  Get a Todo by unique id
 */
router.get('/:id', (req, res) => {
  TodoController.getById(req, res)

})


/**
 *  Delete a Todo by unique id
 */
router.delete('/:id', (req, res) => {

  TodoController.deleteTodo(req, res)

})

module.exports = router;
