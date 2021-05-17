const {v4: uuidv4} = require('uuid')
//for todo, extract todos schema from models
const { todo, done } = require('../models')

module.exports = class todoServices{
    // Create new Todo
    static createTodo(description){
        try{
            let newTodo = todo.create({
                "uniqueId" : uuidv4(),
                "description" : description,
                "isCompleted" : false,
                "reward": ''
            })
            return newTodo
        }
        catch(err){
            console.log(err.message);
        }

    }

    // Get all todos
    static async getAllTodos(){
        try{
            return await todo.findAll({
                where: { isCompleted: false },
                order: [
                    ['createdAt', 'DESC'],
                ],
            })

        } catch(err) {
            console.log(err.message);
        }
    }

    static async getById (id) {
        try{
            let todoId = id

            let response = await todo.findAll({
                where: {
                    uniqueId : todoId
                }
            })

            return response
        }
        catch(err) {
            console.log(err.message);
        }
    }

    static async deleteTodo (id) {
        try{
            let todoId = id
            let response = await todo.destroy({ where: {
                uniqueId: todoId
            }})
            return response
        }
        catch(err) {
            console.log(err.message);
        }
    }

    static async updateTodo(id, fieldToUpdate){
        try{
            console.log(id);
            console.log(fieldToUpdate);
                let response = await todo.update({description: fieldToUpdate},{returning: true, where: {uniqueId: id} })

                return response
            
        } catch(err) {
            console.log(err.message);
        }
    }



    //========== FOR COMPLETED TODOS FEATURE ==================================================

    static async completeTodo(id,status, reward){
        try{
            console.log(id);
                let response = await todo.update({isCompleted: status, reward},{returning: true, where: {uniqueId: id} })

                return response
            
        } catch(err) {
            console.log(err.message);
        }

    }

    static async getAllCompletedTodos(){
        try{
            return await todo.findAll({
                where: { isCompleted: true },
                order: [
                    ['createdAt', 'DESC'],
                ],
            })

        } catch(err) {
            console.log(err.message);
        }
    }

    static async getCompletedTodoById (id) {
        try{
            let todoId = id

            let response = await todo.findAll({
                where: {
                    uniqueId : todoId,
                    isCompleted: true
                }
            })

            return response
        }
        catch(err) {
            console.log(err.message);
        }
    }

    //========== FOR MONGODB ==================================================

    // Create new Todo

    static createTodo(description){
        try{
            let newTodo = new todoModel({
                "uniqueId" : uuidv4(),
                "description" : description,
                "isCompleted" : false,
                "reward": ''
            })
            let response = newTodo.save()
            return response
        }
        catch(err){
            console.log(err.message);
        }
    }

        // Get all todos

    static async getAllTodos(){
        try{
            let docs = await todoModel.find()
            return docs
        } catch(err) {
            console.log(err.message);
        }
    }


    
}