const express = require("express");
const router = express.Router();

const userRouter = require("../controllers/UserController");

router.get("/", userRouter.index);
router.get("/history", userRouter.history);
router.get("/change-pwd", userRouter.changePassword);

module.exports = router;
