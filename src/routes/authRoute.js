const {Router} = require("express");
const {check} = require("express-validator");
const router = Router();

// Services
const authService = require("../services/authService");

// Middlewares
const validateFields = require("../middlewares/validateFields");

router.post("/login",[
    check("email", "That's not an email").isEmail(),
    validateFields
], authService.login);


module.exports = router;