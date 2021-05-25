module.exports = class customValidation {
    static todoCreation(description) {
        let error = {}

        //Description cannot be empty

        if (description.replace(/\s/g, "") == "") {
            error.description = "Description cannot be empty"
        }

        //Description cannot be a boolean
        if (/true|false/.test(description)) {
            error.description = "Description cannot be a boolean"
        }

        if (/^[0-9]+$/.test(description)){
            error.description = "Description cannot contain only number"
        }

        return { error, isValid: Object.keys(error).length == 0}
    }

    static getTodoByID(id) {
        let error = {}

        if(/[0-9]/.test(id)){
            error.description = "Unique ID cannot contain only numbers"
        }

        if (/[a-zA-Z]/.test(id)){
            error.description = "Unique ID cannot contain only alphabet"
        }

        if (/[a-zA-Z0-9]/) {
            error.description = "Unique ID isnt just alphanumeric"
        }

        if(id.indexOf('-') == -1){
            error.description = "Incorrect Unique ID format"
        }

        return { error, isValid: Object.keys(error).length == 0}
    }

    static validateDescription(object){
        let error = {}

        if ('description' in object == false){
            error.description = "'description' is a required field in request body"
        }
        
        return { error, isValid: Object.keys(error).length == 0}
    }
}