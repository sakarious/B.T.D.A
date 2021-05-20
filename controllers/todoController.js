//import services
const todoServices = require('../services/todoServices')
//custom Validation
const validation = require('../validations/customValidation')

module.exports = class TodoController {
    static async createTodo (req, res) {
        try{
            const {error, isValid} = validation.validateDescription(req.body)

            if (!isValid) {
                return res.status(400).json({"code" : 400, "message" : error.description, "error": true})
            }

            let response = await todoServices.createTodo(req.body.description)

            res.status(201).json({"code" : "SUCCESS", "success" : response, "error": null})
        }
        catch(err){
            res.status(500).json({"code" : 500, "message" : "Failed", "error": err.message || "You cannot add a todo at the moment"})
        }
    }

    static async getAllTodos(req, res){
        try{
            let sort = req.params.sort

            let response = await todoServices.getAllTodos(sort)

            res.status(200).json({"code" : "SUCCESS", "success" : response, "error": null})
        }
        catch(err){
            res.status(500).json({"code" : 500, "message" : "Failed", "error": err.message || "You cannot get all todos at the moment"})
        }
    }

    static async getById (req, res) {
        try{
            let response = await todoServices.getById(req.params.id)
            if (response){
                res.status(200).json({"code" : "SUCCESS", "success" : response, "error": null})
            } else {
                res.status(404).json({"code" : "404", "success" : "Todo not found", "error": "Todo not found in database"})
            }
        }
        catch(err){
            res.status(500).json({"code" : 500, "message" : "Failed", "error": err.message || "ooopsss... Something terribly went wrong"})
        }
    }

    static async deleteTodo (req, res) {
        try{
        let response = await todoServices.deleteTodo(req.params.id)
        if (response) {
            res.status(200).json({"code" : "SUCCESSFULLY DELETED", "success" : response, "error": null})
        }else {
            res.status(404).json({"code" : "404", "success" : "Todo not found", "error": "Todo not found in database"})
        }
        }
        catch(err){
            res.status(500).json({"code" : 500, "message" : "Failed", "error": err.message || "ooopsss... Something terribly went wrong"})
        }
    }

    
}