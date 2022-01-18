const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const {generateJWT} = require("../helpers/generate-jwt");


exports.createuser = async (req, res) => {  
    const user = req.body;
    const {email} = user;
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, salt);
    try{
        await User.create(user);
        const {_id} = await User.findOne({email});
        const token = await generateJWT(_id);
        res.status(200).json({
            "message": "User created successfully",
            "user": user,
            token
        })
    }
    catch(err){
        res.status(400).json({
            "message": "Bad Request" 
        })
    }
}