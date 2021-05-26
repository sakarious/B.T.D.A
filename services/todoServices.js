const { v4: uuidv4 } = require("uuid");
//for todo, extract todos schema from models
const { todo, users } = require("../models");
//Validation
const validation = require("../validations");
// Custom Validation
//const validation = require('../validations/customValidation')
//bcrypt
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = class todoServices {
  // To implement, first find if email already exist in db and render a page, else register user
  // Add new user / Register
  static async createUser(firstname, lastname, username, email, passwd) {
    let existingUser = await users.findAll({
      where: {
        email,
      },
    });
    if (existingUser.length == 0) {
      let password = await bcrypt.hash(passwd, saltRound);
      let newUser = users.create({
        firstname,
        lastname,
        username,
        email,
        password,
        isAdmin: false,
      });
      return newUser;
    } else {
      return false; //Email taken. Please select another email
    }
  }

  // Login -- Check is email exists in db, if it doesnt exist render register page, else check if password matches. if it doesnt, return false, if it does, add session
  static async loginUser(email, passwd) {
    let foundUser = await users.findAll({
      where: { email },
    });

    if (foundUser.length == 0) {
      return false; //User does not exist
    }

    if (foundUser.length != 0) {
      //compare credentials
      let user = foundUser[0].dataValues
      let userEmail = user.email;
      let hashPassword = user.password;
      let username = user.username
      let password = await bcrypt.compare(passwd, hashPassword);
      console.log(password);
      if (email == userEmail && password) {
        return {userEmail, hashPassword, username};
      } else {
        return "Fake Credentials";
      }
    }
  }

  // Create new Todo
  static async createTodo(description) {
    try {
      const { error, isValid } = await validation.todoCreation(description);

      if (!isValid) {
        return error.description;
      }

      console.log(description);

      let newTodo = todo.create({
        uniqueId: uuidv4(),
        description: description,
        isCompleted: false,
        reward: "",
      });
      return newTodo;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Get all todos
  static async getAllTodos() {
    try {
      return await todo.findAll({
        where: { isCompleted: false },
        order: [["createdAt", "DESC"]],
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  // Get a todo
  static async getById(id) {
    try {
      const { error, isValid } = validation.getTodoByID(id);

      if (!isValid) {
        return error.description;
      }

      let todoId = id;

      let response = await todo.findAll({
        where: {
          uniqueId: todoId,
        },
      });

      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Delete a todo
  static async deleteTodo(id) {
    try {
      const { error, isValid } = validation.getTodoByID(id);

      if (!isValid) {
        return error.description;
      }

      let todoId = id;
      let response = await todo.destroy({
        where: {
          uniqueId: todoId,
        },
      });
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Update a todo
  static async updateTodo(id, fieldToUpdate) {
    try {
      const { error, isValid } = validation.updateTodoByID(id, fieldToUpdate);

      if (!isValid) {
        return error.description;
      }

      console.log(id);
      console.log(fieldToUpdate);
      let response = await todo.update(
        { description: fieldToUpdate },
        { returning: true, where: { uniqueId: id } }
      );

      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  //========== FOR COMPLETED TODOS FEATURE ==================================================

  static async completeTodo(id, status, reward) {
    try {
      console.log(id);
      let response = await todo.update(
        { isCompleted: status, reward },
        { returning: true, where: { uniqueId: id } }
      );

      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async getAllCompletedTodos() {
    try {
      return await todo.findAll({
        where: { isCompleted: true },
        order: [["updatedAt", "DESC"]],
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  static async getCompletedTodoById(id) {
    try {
      let todoId = id;

      let response = await todo.findAll({
        where: {
          uniqueId: todoId,
          isCompleted: true,
        },
      });

      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  // //========== FOR MONGODB ==================================================

  // // Create new Todo

  // static createTodo(description){
  //     try{
  //         let newTodo = new todoModel({
  //             "uniqueId" : uuidv4(),
  //             "description" : description,
  //             "isCompleted" : false,
  //             "reward": ''
  //         })
  //         let response = newTodo.save()
  //         return response
  //     }
  //     catch(err){
  //         console.log(err.message);
  //     }
  // }

  // // Get all todos

  // static async getAllTodos(){
  //     try{
  //         let docs = await todoModel.find({$and:[{"isCompleted": false}]})
  //         return docs
  //     } catch(err) {
  //         console.log(err.message);
  //     }
  // }

  // // Get a todo

  // static async getById (id) {
  //     try{
  //         let todoId = id

  //         let response = await todoModel.findOne({uniqueId: todoId})

  //         return response
  //     }
  //     catch(err) {
  //         console.log(err.message);
  //     }
  // }

  // // Delete a todo

  // static async deleteTodo (id) {
  //     try{
  //         let todoId = id
  //         let response = await todoModel.findOneAndDelete({uniqueId: todoId})
  //         return response
  //     }
  //     catch(err) {
  //         console.log(err.message);
  //     }
  // }

  // // Update a todo

  // static async updateTodo(id, fieldToUpdate){
  //     try{
  //         console.log(id);
  //         console.log(fieldToUpdate);
  //             let response = await todoModel.update({'uniqueId': id},{$set:{'description':fieldToUpdate }})
  //             return response

  //     } catch(err) {
  //         console.log(err.message);
  //     }
  // }

  // //========== FOR COMPLETED TODOS FEATURE ==================================================

  // // complete todo

  // static async completeTodo(id,status, reward){
  //     try{
  //         console.log(id);
  //             let response = await todoModel.update({'uniqueId': id},{$set:{'isCompleted': status, 'reward': reward }})
  //             return response

  //     } catch(err) {
  //         console.log(err.message);
  //     }

  // }

  // static async getAllCompletedTodos(){
  //     try{
  //         let docs = await todoModel.find({$and:[{"isCompleted": true}]})
  //         return docs
  //     } catch(err) {
  //         console.log(err.message);
  //     }
  // }

  // static async getCompletedTodoById (id) {
  //     try{
  //         let todoId = id

  //         let response = await todoModel.findOne({uniqueId: todoId}, {$and:[{"isCompleted": true}]})

  //         return response
  //     }
  //     catch(err) {
  //         console.log(err.message);
  //     }
  // }
};
