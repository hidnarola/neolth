var express = require("express");
var router = express.Router();

var auth = require("../middlewares/auth");
var authorization = require("../middlewares/authorization");
var config = require('../config')

var index = require('./admin/index');
var hcp = require('./admin/hcp');
var patient = require('./admin/patient');
var question = require('./admin/question');


router.use("/", auth, authorization, index);
router.use("/hcp", auth, authorization, hcp);
router.use("/patient", auth, authorization, patient);
router.use("/question", auth, authorization, question);




module.exports = router;