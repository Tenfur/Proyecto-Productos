const mongoose = require("mongoose");

const connectDatabase = async() => {
    try{
        await mongoose.connect(process.env.MONGODBURI);
        console.log("Database connected :D")
    }
    catch(error){
        console.log(error);
        throw new Error("Eorr in the database :(")
    }
}
module.exports = connectDatabase;