var express = require("express");
var router = express.Router();

const userRouter = require("../controllers/UserController");

router.get("/", userRouter.index);
router.get("/history", userRouter.history);

module.exports = router;
