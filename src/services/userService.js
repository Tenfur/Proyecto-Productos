const User = require("../models/User");
const Product = require("../models/Product");
const bcryptjs = require("bcryptjs");
const {generateJWT} = require("../helpers/generate-jwt");


exports.createuser = async (req, res) => {  
    const user = req.body;
    const {email, name} = user;
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, salt);

    try{
        await User.create(user);
        const {_id} = await User.findOne({email});
        const data = {
            _id,
            name
            
        }
        const token = await generateJWT(_id);
        res.status(200).json({
            "message": "User created successfully",
            "user": data,
            token
        })
    }
    catch(err){
        res.status(400).json({
            "message": "Bad Request",
            err
        })
    }
}


exports.getProductsByUserId = async (req, res) => {
    const {id} = req.params;
    try{
        const results = await Product.find({user:id});
        return res.status(200).json({
            results
        })
    }
    catch(error){
        return res.status(401).json({
            msg: error
        })
    }
}
