var express = require("express");
var router = express.Router();

const gameController = require("../controllers/GameController");

router.get("/", gameController.index);
router.post("/results", gameController.handleGameResults);

module.exports = router;
