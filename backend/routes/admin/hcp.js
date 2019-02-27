var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var jwt = require('jsonwebtoken');

var common_helper = require('../../helpers/common_helper');
var mail_helper = require('../../helpers/mail_helper');
var HCP = require('../../models/hcp');
var ObjectId = require('mongodb').ObjectID;

var mongoose = require('mongoose');


// Get all HCP
router.post("/", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(HCP, { "is_del": false });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var resp_data = await common_helper.findWithFilter(HCP, { "is_del": false }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


//hcp details
router.get("/:id", async (req, res) => {
    id = req.params.id;
    if (id.length != 24) {
        res.status(config.BAD_REQUEST).json({ "message": "Your id must be 12 characters" });
    } else {
        user_id = req.userInfo.id;
        var resp_data = await common_helper.findOne(HCP, { "_id": new ObjectId(req.params.id), "is_del": false }, 1, '');
        if (resp_data.status == 0) {
            logger.error("Error occured while fetching User = ", resp_data);
            res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
        } else {
            logger.trace("User got successfully = ", resp_data);
            res.status(config.OK_STATUS).json(resp_data);
        }
    }

});


// Get all registered HCP
router.post("/", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(HCP, { "is_del": false, "status": "active" });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var resp_data = await common_helper.findWithFilter(HCP, { "is_del": false, "status": "active" }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});

//Approve hcp 
router.put("/approve_hcp", async (req, res) => {
    var obj = {
        status: "active"
    }
    let hcp = await common_helper.findOne(HCP, { "_id": req.body.id }, 1)
    var resp_data = await common_helper.update(HCP, { "_id": req.body.id }, obj);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        let mail_resp = await mail_helper.send("details", {
            "to": hcp.data.email,
            "subject": "Profile Verified"
        }, {
                "info": "you have been successfully registred. Login with us",
            });
        if (mail_resp.status === 0) {
            res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
        } else {
            res.status(config.OK_STATUS).json(resp_data);
        }
    }
});


//Missing details mail hcp 
router.post("/missing_details", async (req, res) => {
    let hcp = await common_helper.findOne(HCP, { "_id": req.body.id }, 1)
    let mail_resp = await mail_helper.send("details", {
        "to": hcp.data.email,
        "subject": "Missing Information"
    }, {
            "info": "Please Fill all the details",
        });
    if (mail_resp.status === 0) {
        res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
    } else {
        res.status(config.OK_STATUS).json({ "status": 1, "message": "Email has been sent to HCP " });
    }

});


//Deactivate hcp 
router.put("/deactive", async (req, res) => {
    var obj = {
        status: "deactive"
    }
    var resp_data = await common_helper.update(HCP, { "_id": req.body.id }, obj);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});



module.exports = router;