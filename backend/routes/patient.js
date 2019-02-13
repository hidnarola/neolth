var express = require("express");
var router = express.Router();

var auth = require("../middlewares/auth");
var authorization = require("../middlewares/authorization");
var config = require('../config')

var index = require('./patient/index');
var monthly_check_in = require('./patient/monthly_check_in');
var practices = require('./patient/practices');
var monthly_report = require('./patient/monthly_report');



router.use("/", auth, authorization, index);
router.use("/monthly_check_in", auth, authorization, monthly_check_in);
router.use("/practices", auth, authorization, practices);
router.use("/monthly_report", auth, authorization, monthly_report);





module.exports = router;