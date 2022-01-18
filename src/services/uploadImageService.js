const cloudinary = require("cloudinary").v2
const User = require("../models/User");
const Product = require("../models/Product");
cloudinary.config(process.env.CLOUDINARY_URL);

exports.uploadImage = async (req, res) => {
    const {collection, id} = req.params;
    const collectionsAllowed = ["users", "products"];

    if(!req.files){
        res.status(400).json({
            msg: "Sorry, you need a file"
        })
    }

    if(!collectionsAllowed.includes(collection)){
        res.status(400).json({
            msg: "Sorry, that collection doesn't exist"
        })
    }
    let model;

    switch(collection){
        case "users": 
            console.log("lala");
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: "That user doesn't exist"
                });
            }
            break;
        case "products":
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: "That product doesn't exist"
                });
            }
            break;
    }

    const {tempFilePath} = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;

    res.status(200).json({
        collection , id, model
    })
    
}