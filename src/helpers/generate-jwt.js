const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {id};
        jwt.sign(payload, process.env.SECRETKEY,{
            expiresIn: "4h"
        }, (err, token) => {
            if(err){
                reject("There's an error")
            }
            else{
                resolve(token)
            }
        })
    });
}

module.exports ={
    generateJWT
}