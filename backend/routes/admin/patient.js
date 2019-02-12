var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var jwt = require('jsonwebtoken');

var common_helper = require('../../helpers/common_helper');
var mail_helper = require('../../helpers/mail_helper');
var Patient = require('../../models/patient');
var HCP = require('../../models/hcp');
var ObjectId = require('mongodb').ObjectID;

var mongoose = require('mongoose');


// Get all patient
router.post("/", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(Patient, { "is_del": false });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var resp_data = await common_helper.findWithFilter(Patient, { "is_del": false }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


//patient details
router.get("/:id", async (req, res) => {
    id = req.params.id;
    if (id.length != 24) {
        res.status(config.BAD_REQUEST).json({ "message": "Your id must be 12 characters" });
    } else {
        user_id = req.userInfo.id;
        var resp_data = await common_helper.findOne(Patient, { "_id": new ObjectId(req.params.id), "is_del": false }, 1, '');
        if (resp_data.status == 0) {
            logger.error("Error occured while fetching User = ", resp_data);
            res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
        } else {
            logger.trace("User got successfully = ", resp_data);
            res.status(config.OK_STATUS).json(resp_data);
        }
    }

});


//Deactivate patient 
router.put("/deactive", async (req, res) => {
    var obj = {
        status: "deactive"
    }
    var resp_data = await common_helper.update(Patient, { "_id": req.body.id }, obj);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


module.exports = router;