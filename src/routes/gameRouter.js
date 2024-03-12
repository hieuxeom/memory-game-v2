var express = require('express');
var router = express.Router();


const gameController = require("../controllers/GameController")

router.get('/', gameController.index);

module.exports = router;
