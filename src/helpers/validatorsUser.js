const User = require("../models/User");

exports.validateEmail = async (email = "") => {
    const emailExists = await User.findOne({email});
    if(emailExists){
        throw new Error("This email exists, use another")
    }
}

