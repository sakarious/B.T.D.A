//Express router
const router = require('express').Router();
//import frontend controlleer
const frontendController = require('../controllers/frontendController');

router.get('/', (req, res) => {
    frontendController.homepage(req, res)
})

router.get('/create', (req, res) => {
    frontendController.createTodo(req, res)
})

router.get('/all', (req, res) => {
    frontendController.getAll(req, res)
})

router.post('/process', (req, res) => {
    frontendController.processTodo(req, res)
})

router.get('/view/:uniqueId', (req, res) => {
    frontendController.getOne(req, res)
})

router.get('/update/:uniqueId', (req, res) => {
    frontendController.updateTodo(req, res)
})

router.post('/updateTodo/:uniqueId', (req, res) => {
    frontendController.processUpdateTodo(req, res)
})

router.get('/delete/:uniqueId', (req, res) => {
    frontendController.deleteOne(req, res)
})

router.post('/delete/:uniqueId', (req, res) => {
    frontendController.processDelete(req, res)
})

module.exports = router