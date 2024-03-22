const express = require("express");
const router = express.Router();

const themeController = require("../controllers/ThemeController");

router.get("/", themeController.index);

module.exports = router;
