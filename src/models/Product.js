const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    name:{
        type: String,
        unique: true
    },
    price: {
        type: Number
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    img:{
        type: String
    },
    description:{
        type: String
    }
});

productSchema.methods.toJSON = function(){
    const {__v, ...product} = this.toObject();
    return product;
}

module.exports = model("product", productSchema);
