const express = require("express");
const router = express.Router();

const gameController = require("../controllers/GameController");

router.get("/", gameController.index);

module.exports = router;
