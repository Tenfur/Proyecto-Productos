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
    check("name").custom(validatorUser.validateName),
    validatesFields,
userService.createuser);

router.get("/:id/products", userService.getProductsByUserId);



module.exports = router;
