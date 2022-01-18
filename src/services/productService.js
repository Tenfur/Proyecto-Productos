const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    const product = req.body;
    product.user = req.userId;
    try{
        await Product.create(product);
        res.status(200).json({
            "message": "Ceated successfully",
            "data": req.body
        })
    }
    catch(error){
        res.status(404).json({
            "message": "Error",
            error
        })
    }
}

exports.getProducts = async (req, res) => {
    try{
        const products = await Product.find().populate("user");
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