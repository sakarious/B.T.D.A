let validator = require('validator')

module.exports = class Validation {
    static todoCreation (description) {
        let error = {}

        if (validator.isEmpty(description)){
            error.description = "Description cannot be empty"
        }

        if (validator.isNumeric(description)){
            error.description = "Description cannot be only Numbers"
        }

        if(validator.isBoolean(description)){
            error.description = "Description cannot be a Boolean"
        }

        return { error, isValid: Object.keys(error).length == 0}

    }

    static getTodoByID(id){
        let error = {}

        if (validator.isNumeric(id)){
            error.description = "Unique ID cannot contain only numbers"
        }

        if(validator.isAlpha(id)){
            error.description = "Unique ID cannot contain only alphabet"
        }

        if (validator.isAlphanumeric(id)){
            error.description = "Unique ID cannot contain only alphabet and numbers"
        }

        return { error, isValid: Object.keys(error).length == 0 }
    }

    static updateTodoByID(id, description){
        let error = {}

        if (validator.isNumeric(id)){
            error.description = "Unique ID cannot contain only numbers"
        }

        if(validator.isAlpha(id)){
            error.description = "Unique ID cannot contain only alphabet"
        }

        if (validator.isAlphanumeric(id)){
            error.description = "Unique ID cannot contains string"
        }

        if (validator.isEmpty(description)){
            error.description = "Description cannot be empty"
        }

        if (validator.isNumeric(description)){
            error.description = "Description cannot be only Numbers"
        }

        if(validator.isBoolean(description)){
            error.description = "Description cannot be a Boolean"
        }


        return { error, isValid: Object.keys(error).length == 0 }
    }
}