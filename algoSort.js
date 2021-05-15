// Installed sequelize, sequelize-cli and mysql2

//run npx sequelize init to give me model, config, etc folders

//Deleted seeders and Migrations cos i wont be needing it here

//Create Database todos in sql

//Put in my details in the config folder

//Bring in db from models to index

const todos = require('./models')
console.log(todos.todo);