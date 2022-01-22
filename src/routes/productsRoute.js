const {Router} = require("express");
const {check} = require("express-validator");
const router = Router();

// Services
const productService = require("../services/productService");

// Validators
const validators = require("../helpers/validatorsProduct");

// Middlewares
const validateFields = require("../middlewares/validateFields");
const {validateJWT} = require("../middlewares/validateJwt");
const uploadFile = require("../middlewares/uploadFile");

// Get all products
router.get("/", productService.getProducts);

// Get product By Id
router.get("/:id", productService.getProductById);

// Create product
router.post("/",[
    validateJWT,
], productService.createProduct);

// Delete product
router.delete("/:id",[
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(validators.validateIdProduct),
    validateFields],
productService.deleteProduct);

// Update product
router.put("/:id",[
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(validators.validateIdProduct),
    validateFields],
productService.updateProduct);


module.exports = router;