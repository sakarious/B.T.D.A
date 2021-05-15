const {v4: uuidv4} = require('uuid')
//for todo, extract todos schema from models
const { todo } = require('../models')

module.exports = class todoServices{
    static async createTodo(description){
        try{
            let newTodo = await todo.create({
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
            let docs = await todo.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            return docs

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
    
}