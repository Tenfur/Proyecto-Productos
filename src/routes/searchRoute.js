const {Router}= require("express");
const router = Router();

// Services
const searchService = require("../services/searchService");

router.get("/:collection/:value", searchService.searchData);

module.exports = router;