const {v4: uuidv4} = require('uuid')
//for todo, extract todos schema from models
const { todo, done } = require('../models')

module.exports = class todoServices{
    static createTodo(description){
        try{
            let newTodo = todo.create({
                "uniqueId" : uuidv4(),
                "description" : description,
                "isCompleted" : false
            })
            return newTodo
        }
        catch(err){
            console.log(err.message);
        }

    }

    static async getAllTodos(){
        try{
            return await todo.findAll({
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

    static completeTodo(id, description, status, reward){
        try{
            let completedTodo = done.create({
                "uniqueId" : id,
                "description" : description,
                "reward" : reward,
                "isCompleted" : status,
            })
            return completedTodo
        }
        catch(err){
            console.log(err.message);
        }

    }

    static async getAllCompletedTodos(){
        try{
            return await done.findAll({
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

            let response = await done.findAll({
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
    
}