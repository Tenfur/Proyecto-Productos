const User = require("../models/User");
const {generateJWT} = require("../helpers/generate-jwt");
const bcryptjs = require("bcryptjs");

exports.login = async (req, res) => {
    // Validate if the email exists
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            msg: "That user doesn't exist in the database"
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
        msg: "Welcome",
        token
    })

}