//import services
const todoServices = require('../services/todoServices')

module.exports = class frontendController {

    static homepage (req, res) {
        res.render('index')
    }

    static createTodo (req, res) {
        res.render('create', {title: 'Create Todo'})
    }

    static async processTodo (req, res) {

            let response = await todoServices.createTodo(req.body.description)
            if(response){
                let  newUID = response.dataValues.uniqueId
                res.redirect(`/view/${newUID}`)
            }

    }

    static async getAll(req, res){
        let allTodos = await todoServices.getAllTodos()
        if(allTodos){
            res.render('getAllTodos', {title: 'See all Todos', todos: allTodos})
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

}