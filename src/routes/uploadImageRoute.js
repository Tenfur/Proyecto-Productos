const {Router} = require("express");
const router = Router();

// Services
const uploadService = require("../services/uploadImageService")

router.post("/:collection/:id", uploadService.uploadImage);

module.exports = router;