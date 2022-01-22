const User = require("../models/User");

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
