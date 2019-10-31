var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var inline = require("express-inline-css");
var compression = require("compression");
var minify = require("express-minify");
var numeral = require("numeral");
var hbs = require("hbs");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");

// register handlebars helpers
hbs.registerHelper("acronym", function(str) {
  return str.match(/\b\w/g).join("");
});

hbs.registerHelper("dist_abbrev", function(num) {
  return numeral(num).format("0.[0]a");
});

hbs.registerHelper("and", function() {
  return Array.prototype.slice.call(arguments).every(Boolean);
});

// hook up middleware
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(
  inline({
    override: false,
    cssFilePath: "public/css/style.css"
  })
);
app.use(compression());
app.use(
  minify({
    uglifyJsModule: require("uglify-es"),
    js_match: /js/
  })
);
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
