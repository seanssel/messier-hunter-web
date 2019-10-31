var express = require("express");
var router = express.Router();
var mobjects = require("../src/data/messier-objects.json");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.renderInlineCSS("index", {
    title: "Messier Hunter",
    mobjects: mobjects
  });
});

module.exports = router;
