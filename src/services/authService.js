const User = require("../models/User");
const {generateJWT} = require("../helpers/generate-jwt");
const bcryptjs = require("bcryptjs");

exports.login = async (req, res) => {
    // Validate if the email exists
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            msg: "That user doesn't exist in the app"
        })
    }
    // Validate password
    const validatePassword = bcryptjs.compareSync(password, user.password);
    if(!validatePassword){
        return res.status(400).json({
            msg: "That password is incorrect"
        })
    }

    // Generate JWT
    const token = await generateJWT(user._id);

    res.status(200).json({
        user,
        token
    })
}

exports.authenticateUser = async(req, res) => {
    try{
        const user = await User.findById(req.userId);
        res.json({
            user
        })
    }
    catch(error){
        res.status(500).json({
            msg: "There's an error"
        })
    }
   

}