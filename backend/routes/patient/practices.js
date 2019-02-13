var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');

var common_helper = require('../../helpers/common_helper');
var Practice = require('../../models/practices');


//get all practices
router.post("/", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(Practice, { "is_del": false, "patient_id": req.userInfo.id });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var resp_data = await common_helper.findWithFilters(Practice, { "is_del": false, "patient_id": req.userInfo.id }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject, 'practice', '', '');
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});

// Get all completed practices
router.post("/completed", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(Practice, { "status": "completed", "is_del": false, "patient_id": req.userInfo.id });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var resp_data = await common_helper.findWithFilters(Practice, { "status": "completed", "is_del": false, "patient_id": req.userInfo.id }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject, 'practice', '', '');
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


//complete the practice
router.put("/complete", async (req, res) => {
    var obj = {
        status: "completed"
    }
    var resp_data = await common_helper.update(Practice, { "patient_id": ObjectId(req.userInfo.id), "_id": ObjectId(req.body.id) }, obj);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


//skip the practice
router.put("/skip", async (req, res) => {
    var obj = {
        is_del: "true"
    }
    var resp_data = await common_helper.update(Practice, { "patient_id": ObjectId(req.userInfo.id), "_id": ObjectId(req.body.id) }, obj);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});

module.exports = router;