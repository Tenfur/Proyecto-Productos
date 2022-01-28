const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2
cloudinary.config(process.env.CLOUDINARY_URL);

exports.createProduct = async (req, res) => {
    const product = req.body;
    if(req.files){
        product.user = req.userId;
        const {tempFilePath} = req.files.file;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        product.img = secure_url;
        try{
            await Product.create(product);
            res.status(200).json({
                "message": "Created successfully",
                "data": req.body
            })
        }catch(error){
            res.status(404).json({
                "message": "Error",
                error
            })
        }
    }
    else{
        return res.status(400).json({
            msg: "The photo is neccessary"
        })
    }
}

exports.getProducts = async (req, res) => {
    const {since, limit} = req.query;
    
    try{
        const products = await Product.find().populate("user").skip(Number(since)).limit(Number(limit));
        res.status(200).json({
            "data": products
        })
    }
    catch(error){
        res.status(404).json({
            "message": "Error",
            error
        })
    }
}

exports.deleteProduct = async(req, res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id)
        res.status(202).json({
            "message": "Product deleted successfully"
        })
    }
    catch(error){
        res.status(400).json({
            "message": "Bad request",
            error
        })
    }
}

exports.updateProduct = async(req,res) => {
    const {id} = req.params;
    // console.log(req.files);}
    if(req.files){
        const {tempFilePath} = req.files.file;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        // product.img = secure_url;
        req.body.img = secure_url;
    }
    try{
        await Product.updateOne({_id: id}, req.body)
        res.status(202).json({
            "message": "Product updated successfully"
        })

    }
    catch(error){
        res.status(400).json({
            "message": "Bad request",
            error
        })
    }
}

exports.getProductById = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    try{
        const product = await Product.findById(id).select("-_id");
        return res.status(200).json({
            product
        })
    }
    catch(error){
        return res.status(400).json({
            msg: error
        })
    }
}