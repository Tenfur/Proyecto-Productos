const jwt = require("jsonwebtoken");

const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if(!token){
        return res.status(400).json({
            msg: "Sorry, you need a token :(",
            hello: "lalal"
        })
    }
    try{
        const {id} = await jwt.verify(token, process.env.SECRETKEY);
        req.userId = id; 
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({
            msg: "Token invalid"
        })
    }
}

module.exports = {
    validateJWT
};