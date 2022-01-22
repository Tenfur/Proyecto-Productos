const {Schema, model} = require("mongoose");

const schemaUser = new Schema({
    email:{
        type: String
    },
    img:{
        type: String
    },
    password:{
        type: String
    },
    name: {
        type: String,
        required: true
    }
});

schemaUser.methods.toJSON = function(){
    const {__v, password, email, ...user} = this.toObject();
    return user;
}

module.exports = model("user", schemaUser);