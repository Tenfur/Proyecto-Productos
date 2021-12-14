const {Router} = require("express");
const {check} = require("express-validator");
const router = Router();

// Services
const productService = require("../services/productService");

// Validators
const validators = require("../helpers/validatorsProduct");

// Middlewares
const validateFields = require("../middlewares/validateFields");

// Get all products
router.get("/", productService.getProducts);

// Create product
router.post("/", productService.createProduct);

// Delete product
router.delete("/:id",
    check("id").isMongoId(),
    check("id").custom(validators.validateIdProduct),
    validateFields,
productService.deleteProduct);

// Update product
router.put("/:id",
    check("id").isMongoId(),
    check("id").custom(validators.validateIdProduct),
    validateFields,
productService.updateProduct);


module.exports = router;