var express = require("express");
var router = express.Router();

var auth = require("../middlewares/auth");
var authorization = require("../middlewares/authorization");
var config = require('../config')

var index = require('./admin/index');
var hcp = require('./admin/hcp');
var patient = require('./admin/patient');
var question = require('./admin/question');
var statistics = require('./admin/statistics');


router.use("/", auth, authorization, index);
router.use("/hcp", auth, authorization, hcp);
router.use("/patient", auth, authorization, patient);
router.use("/question", auth, authorization, question);
router.use("/statistics", auth, authorization, statistics);




module.exports = router;