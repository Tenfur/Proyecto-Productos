const {Router} = require("express");
const {check} = require("express-validator");
const router = Router();

// Services
const userService = require("../services/userService");

// Validators
const validatorUser = require("../helpers/validatorsUser");

// Middlewares
const validatesFields = require("../middlewares/validateFields");

// Create user
router.post("/",
    check("email").custom(validatorUser.validateEmail),
    validatesFields,
userService.createuser);




module.exports = router;
