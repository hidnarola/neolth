var express = require("express");
var router = express.Router();

var auth = require("../middlewares/auth");
var authorization = require("../middlewares/authorization");
var config = require('../config')

var index = require('./hcp/index');


router.use("/", auth, authorization, index);




module.exports = router;