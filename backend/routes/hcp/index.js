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

//send invitation email to Patient
router.post('/invite_patient', async (req, res) => {
    var schema = {
        "email": {
            notEmpty: true,
            errorMessage: "Company Registration Number is required"
        }
    };
    req.checkBody(schema);
    var errors = req.validationErrors();
    if (!errors) {
        var patient = await common_helper.findOne(Patient, { "email": req.body.email }, 1)
        var hcp = await common_helper.findOne(HCP, { "email": req.body.email }, 1)

        if (patient.status === 2 && hcp.status === 2) {
            var obj = {
                "email": req.body.email,
                "status": "pending",
                "referral_code": req.body.referral_code,
                "hcp_id": req.userInfo.id
            }
            var patient_insert = await common_helper.insert(Patient, obj);
            if (patient_insert.status === 0) {
                res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
            } else {
                let mail_resp = await mail_helper.send("invite", {
                    "to": req.body.email,
                    "subject": "Register As a patient"
                }, {
                        "referral_code": req.body.referral_code,
                    });
                if (mail_resp.status === 0) {
                    res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
                } else {
                    res.status(config.OK_STATUS).json({ "status": 1, "message": "Invitation email has been sent to company's email address" });
                }
                // res.status(config.OK_STATUS).json({ "status": 1, "message": "Invitation email has been sent to company's email address" });
            }
        }
        else {
            res.status(config.BAD_REQUEST).json({ message: "Email already exist" });
        }
    } else {
        logger.error("Validation Error = ", errors);
        res.status(config.BAD_REQUEST).json({ message: errors });
    }
});


//Create Sub User
router.post('/create_sub_user', async (req, res) => {
    var schema = {
        "email": {
            notEmpty: true,
            errorMessage: "Email is required"
        },
        "password": {
            notEmpty: true,
            errorMessage: "Password is required"
        }
    };
    req.checkBody(schema);
    var errors = req.validationErrors();
    if (!errors) {
        var patient = await common_helper.findOne(Patient, { "email": req.body.email }, 1)
        var hcp = await common_helper.findOne(HCP, { "email": req.body.email }, 1)
        if (patient.status === 2 && hcp.status === 2) {
            var obj = {
                "email": req.body.email,
                "status": "active",
                "password": req.body.password,
                "hcp_id": req.userInfo.id,
                "user_type": "child"
            }
            var hcp_insert = await common_helper.insert(HCP, obj);
            if (hcp_insert.status === 0) {
                res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
            } else {
                var mail_resp = await mail_helper.send("sub_user", {
                    "to": req.body.email,
                    "subject": "Login as HCP sub user"
                }, {
                        "email": req.body.email,
                        "password": req.body.password
                    });
                if (mail_resp.status === 0) {
                    res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
                } else {
                    res.status(config.OK_STATUS).json({ "status": 1, "message": "Invitation email has been sent to sub user" });
                }
            }
        }
        else {
            res.status(config.BAD_REQUEST).json({ message: "Email already exist" });
        }
    } else {
        logger.error("Validation Error = ", errors);
        res.status(config.BAD_REQUEST).json({ message: errors });
    }
});


// Update profile data
router.put("/", async (req, res) => {
    user_id = req.userInfo.id;
    var obj = {
    };
    if (req.body.name) {
        obj.name = req.body.name;
    }
    if (req.body.username) {
        obj.username = req.body.username;
    }
    if (req.body.email) {
        obj.email = req.body.email;
    }
    if (req.body.practice_solution) {
        obj.practice_solution = req.body.practice_solution;
    }
    if (req.body.status) {
        obj.status = req.body.status;
    }
    var resp_datas = await common_helper.findOnes(HCP, { "_id": req.userInfo.id }, 1);
    if (resp_datas && resp_datas.data) {
        if (resp_datas.data.user_type == "parent" || resp_datas.data.user_type == "child") {
            var hcp_email = await common_helper.findOne(HCP, { "email": req.body.email, "is_del": false, "_id": { $ne: (new ObjectId(req.userInfo.id)) } }, 1)
            var patient_email = await common_helper.findOne(Patient, { "email": req.body.email, "is_del": false }, 1)
            if (hcp_email.status === 2 && patient_email.status === 2) {
                var hcp_upadate = await common_helper.update(HCP, { "_id": req.userInfo.id }, obj)
                res.json({ "message": "Updated successfully", "data": hcp_upadate })
            }
            else {
                res.status(config.BAD_REQUEST).json({ message: "Email already exist" });
            }
        }
        else {
            res.status(config.BAD_REQUEST).json({ "message": "You don't have access to this page" });
        }
    } else {
        res.status(config.BAD_REQUEST).json({ "message": "No data found" });
    }
});


//get hcp profile data
router.get("/", async (req, res) => {
    var resp_datas = await common_helper.findOnes(HCP, { "_id": req.userInfo.id }, 1);
    if (resp_datas.data.user_type == "child" || resp_datas.data.user_type == "parent") {
        if (resp_datas.data.user_type == "parent") {
            var resp_data = await common_helper.findOne(HCP, { "user_type": "parent", "_id": new ObjectId(req.userInfo.id) }, 1);
            console.log('resp_data', resp_data);

            if (resp_data.status == 0) {
                logger.error("Error occured while fetching User = ", resp_data);
                res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
            } else {
                logger.trace("User got successfully = ", resp_data);
                res.status(config.OK_STATUS).json(resp_data);
            }
        }
        // else if (resp_datas.data.user_type == "parent") {
        //     var resp_data = await common_helper.findOne(HCP, { "user_type": "parent", "patient_id": new ObjectId(req.userInfo.id) }, 1);
        //     if (resp_data.status == 0) {
        //         logger.error("Error occured while fetching User = ", resp_data);
        //         res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
        //     } else {
        //         logger.trace("User got successfully = ", resp_data);
        //         res.status(config.OK_STATUS).json(resp_data);
        //     }
        // }  
    }
    else {
        res.status(config.BAD_REQUEST).json({ "message": "You don't have access to this page" });
    }
});



module.exports = router;