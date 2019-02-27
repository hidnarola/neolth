var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');

var common_helper = require('../../helpers/common_helper');
var Practice = require('../../models/practices');
var Self_activity = require('../../models/self_activity');


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


// Add self care activity
router.post("/activity", async (req, res) => {
    var schema = {
        // "date": {
        //     notEmpty: true,
        //     errorMessage: "Date is required"
        // },
        "activity_name": {
            notEmpty: true,
            errorMessage: "Activity name is required"
        },
        "description": {
            notEmpty: true,
            errorMessage: "Description is required"
        }

    };
    req.checkBody(schema);
    var errors = req.validationErrors();
    if (!errors) {
        var obj = {
            "patient_id": req.userInfo.id,
            "date": req.body.date,
            "activity_name": req.body.activity_name,
            "description": req.body.description
        };
        console.log('obj', obj);

        var activity_insert = await common_helper.insert(Self_activity, obj);
        if (activity_insert.status === 0) {
            res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": activity_insert });
        } else {
            //res.status(config.OK_STATUS).json({ "status": 1, "message": "Self care activity has been added" });
            res.json({ "message": "Self care activity has been added", "data": activity_insert })
        }
    }
    else {
        logger.error("Validation Error = ", errors);
        res.status(config.BAD_REQUEST).json({ message: errors });
    }
});


//delete activity
router.post('/activity/delete', async (req, res) => {
    var del_id = await common_helper.findOne(Self_activity, { "_id": req.body.id }, 1)
    if (del_id.status == 1) {
        var del_resp = await Self_activity.update({ _id: new ObjectId(req.body.id) }, { $set: { "is_del": true } })
        if (del_resp.status == 0) {
            logger.debug("Error = ", del_resp.error);
            res.status(config.INTERNAL_SERVER_ERROR).json(del_resp);
        } else {
            res.json({ "message": "Activity has been deleted successfully", "data": del_resp })
        }
    }
    else {
        res.status(config.BAD_REQUEST).json({ message: "Id does not exist" });
    }
});


//Get activity
router.get('/activity', async (req, res) => {
    var resp = await Self_activity.find({ "patient_id": new ObjectId(req.userInfo.id), "is_del": false });
    if (resp.status == 1) {
        res.status(config.BAD_REQUEST).json({ message: "No data" });
    }
    else if (resp.status == 2) {
        res.status(config.BAD_REQUEST).json({ message: "No data found" });
    }
    else {
        res.json({ "message": "Data found", "data": resp })
    }
});


module.exports = router;