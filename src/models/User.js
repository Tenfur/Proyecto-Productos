const {Schema, model} = require("mongoose");

const schemaUser = new Schema({
    email:{
        type: String
    },
    password:{
        type: String
    },
    name: {
        type: String
    }
});

module.exports = model("user", schemaUser);