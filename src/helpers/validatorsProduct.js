const Product = require("../models/Product");

exports.validateIdProduct = async (id ="") => {
    const user = await Product.findById(id);
    if(!user){
        throw new Error("This id is incorrect")
    }
}
