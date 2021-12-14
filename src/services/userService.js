const User = require("../models/User");
const bcryptjs = require("bcryptjs");

exports.createuser = async (req, res) => {
    const user = req.body;
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, salt);
    try{
        await User.create(user);
        res.status(200).json({
            "message": "User created successfully",
            "user": user
        })
    }
    catch(err){
        res.status(400).json({
            "message": "Bad Request" 
        })
    }
}