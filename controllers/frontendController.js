//import services
const { diskStorage } = require('multer')
const todoServices = require('../services/todoServices')

module.exports = class frontendController {

    static homepage (req, res) {
        res.render('index')
    }

    static createTodo (req, res) {
        res.render('create', {title: 'Create Todo'})
    }

    static async processTodo (req, res) {
            let description = req.body.description
            let response = await todoServices.createTodo(description)
            if(response){
                res.redirect('/all')
            }
    }

    static async getAll(req, res){
        let allTodos = await todoServices.getAllTodos()
        if(allTodos){
            res.render('getAllTodos', {title: 'See all Todos', todos :allTodos})
        }
    }

    static async getOne(req, res){
        let id = req.params.uniqueId
        let todo = await todoServices.getById(id)
        res.render('getOneTodo', {title: 'Todo', Onetodo: todo})
    }

    static async updateTodo (req, res) {
        let id = req.params.uniqueId
        console.log(id);
        let todo = await todoServices.getById(id)
        res.render('update', {title: 'Update Todo', OneTodo: todo})
    }

    static async processUpdateTodo(req, res){
        let id = req.params.uniqueId;
        console.log('controller id ', id);
        let description = req.body.description;
        console.log('controller desc ', description);
        let response = await todoServices.updateTodo(id, description)
        console.log(`/view/${id}`);
        res.redirect(`/view/${id}`)
    }

    static async deleteOne(req, res){
        let id = req.params.uniqueId
        let todo = await todoServices.getById(id)
        res.render('delete', {title: 'Delete Todo', Onetodo: todo})
    }

    static async processDelete(req, res){
        let id = req.params.uniqueId
        console.log(id);
        let response = await todoServices.deleteTodo(id)
        res.redirect('/all')
    }

    static async complete(req, res){
        let id = req.params.uniqueId
        let todo = await todoServices.getById(id)
        res.render('done', {title: 'Complete Todo', Onetodo: todo})
    }

    static async processComplete(req, res) {
        let id = req.body.uniqueID
        let description = req.body.description
        let reward = (req.body.reward == '') ? 'More Work' : req.body.reward
        
        if (req.body.status == '') {
            let status = true 
            let response = await todoServices.completeTodo(id, status, reward)
            if (response){
                res.redirect('/completedtodos')
            }
        } else{
            res.redirect('/all')
        }
        
        
    }

    static async getAllCompleted(req, res){
        let allTodos = await todoServices.getAllCompletedTodos()
        if(allTodos){
            res.render('completed', {title: 'All completed Todos', todos :allTodos})
        }
    }

    static async getOneCompleted(req, res){
        let id = req.params.uniqueId
        let todo = await todoServices.getCompletedTodoById(id)
        res.render('getOneCompletedTodo', {title: 'Todo', Onetodo: todo})
    }

}