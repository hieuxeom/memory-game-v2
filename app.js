var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
const multer = require("multer");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./src/routes/indexRouter");
const gameRouter = require("./src/routes/gameRouter");
const rankRouter = require("./src/routes/rankRouter");
const themeRouter = require("./src/routes/themeRouter");
const apiRouter = require("./src/routes/apiRouter");
const adminRouter = require("./src/routes/adminRouter");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter.js");

app.use("/", indexRouter);
app.use("/home", indexRouter);
app.use("/game", gameRouter);
app.use("/rank", rankRouter);
app.use("/theme", themeRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
