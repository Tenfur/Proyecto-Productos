const User = require("../models/User");
const Product = require("../models/Product");
const bcryptjs = require("bcryptjs");
const {generateJWT} = require("../helpers/generate-jwt");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);


exports.createuser = async (req, res) => {  
    const user = req.body;
    const {email, name} = user;

    // Password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, salt);

    // Upload user's image
    const {tempFilePath} = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    user.img = secure_url;

    try{
        await User.create(user);
        const {_id, img} = await User.findOne({email});
        const data = {
            _id,
            name,
            img
            
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


exports.updateUser = async (req, res) => {
    console.log(req.body);
    const {id} = req.params;
    // console.log(req.files);
    if(req.files){
        const {tempFilePath} = req.files.file;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        // product.img = secure_url;
        req.body.img = secure_url;
    }
    // console.log(req.body.img);
    try{
        const user = await User.findByIdAndUpdate({_id: id}, req.body); 
        const newUser = await User.findById(id);
        res.status(202).json({
            "message": "Profile updated successfully",
            newUser
        })
    }
    catch(error){
        return res.status(400).json({
            msg: error
        })
    }

}

exports.getUsers = async (req, res) => {
    const {since, limit} = req.query;
    try{
        const data = await User.find().skip(Number(since)).limit(Number(limit));
        return res.status(200).json(data);
    }
    catch(error){
        return res.status(400).json({
            msg: error
        })
    }
}

exports.getUserInfo = async(req, res) => {
    const {id} = req.params;
    try{
        const data = await User.findById(id);
        return res.status(200).json(data)
    }
    catch(error){
        return res.status(400).json(error);
    }
}