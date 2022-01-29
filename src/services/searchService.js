const User = require("../models/User");
const Product = require("../models/Product");

const collections = ["products", "users"];

const getDataUsers = async (value, res) => {
    const regx = new RegExp(value, "i");
    try{
        const users = await User.find({
            name: regx
        });
        res.status(200).json({
            users
        })
    }
    catch(error){
        res.status(400).json(error)
    }
}

const getDataProducts = async (value, res) => {
    const regx = new RegExp(value, "i");
    try{
        const products = await Product.find({
            name: regx
        });
        res.status(200).json({
            products
        })
    }
    catch(error){
        res.status(400).json(error)
    }

}

exports.searchData = (req, res) => {
    const {collection, value} = req.params;
   
    if(!collections.includes(collection)){
        res.status(400).json({
            msg: "That collection doesn't exist in the server"
        })
    }

    if(collection == "users"){
        getDataUsers(value, res);
    }
    else if(collection == "products"){
        getDataProducts(value, res);
    }

}