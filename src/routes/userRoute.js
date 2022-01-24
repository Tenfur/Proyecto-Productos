const {Router} = require("express");
const {check} = require("express-validator");
const router = Router();

// Services
const userService = require("../services/userService");

// Validators
const validatorUser = require("../helpers/validatorsUser");

// Middlewares
const validatesFields = require("../middlewares/validateFields");
const {validateJWT} = require("../middlewares/validateJwt");

// Create user
router.post("/",
    check("email").custom(validatorUser.validateEmail),
    check("name").custom(validatorUser.validateName),
    validatesFields,
userService.createuser);

// Get user's products
router.get("/:id/products",[
    validateJWT,
    check("id", "It's not a mongo id").isMongoId(),
    check("id").custom(validatorUser.validateIdUser),
    validatesFields
], userService.getProductsByUserId);

// Update user's info
router.put("/:id",[
    validateJWT,
    check("id", "It's not a mongo id").isMongoId(),
    check("id").custom(validatorUser.validateIdUser),
    validatesFields
], userService.updateUser);

// Get all users
router.get("/", validateJWT, userService.getUsers);

// Get user's info
router.get("/:id", [
    validateJWT,
    check("id", "It's not a mongo id").isMongoId(),
    check("id").custom(validatorUser.validateIdUser),
    validatesFields
], userService.getUserInfo);


module.exports = router;
