const User = require("../models/User");

exports.validateIdUser = async (id = "") => {
    const user = await User.finById(id);
    if(!user){
        throw new Error("This user id doesn't exist in the server");
    }
}

exports.validateEmail = async (email = "") => {
    const emailExists = await User.findOne({email});
    if(emailExists){
        throw new Error("This email exists, use another")
    }
}
exports.validateName = async(name = "") => {
    const nameExists = await User.findOne({name});
    if(nameExists){
        throw new Error ("This name exists, use another")
    }
}
