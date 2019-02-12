var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var jwt = require('jsonwebtoken');
var async = require('async');
var fs = require('fs');
var path = require('path');
var common_helper = require('../../helpers/common_helper');
var Wellness = require('../../models/wellness_practices');
var Question = require('../../models/question');
var Option = require('../../models/option');
var ObjectId = require('mongodb').ObjectID;

var mongoose = require('mongoose');


router.post("/wellness_practices", async (req, res) => {
    var schema = {
        "name": {
            notEmpty: true,
            errorMessage: "Name is required"
        },
        "practice_type": {
            notEmpty: true,
            errorMessage: "Practice Type is required"
        },
        "practice_content": {
            notEmpty: true,
            errorMessage: "Practice Content is required"
        },
        "matching_symptom": {
            notEmpty: true,
            errorMessage: "Matching Symptom is required"
        },
        "matching_stress": {
            notEmpty: true,
            errorMessage: "Matching stress is required"
        },
        "matching_proficiency": {
            notEmpty: true,
            errorMessage: "Matching Proficiency is required"
        },
        "matching_diagnosis": {
            notEmpty: true,
            errorMessage: "Matching Diagnosis is required"
        },
    };
    req.checkBody(schema);
    var errors = req.validationErrors();
    if (!errors) {
        var obj = {
            "name": req.body.name,
            "practice_type": req.body.practice_type,
            "practice_content": req.body.practice_content,
            "matching_symptom": JSON.parse(req.body.matching_symptom),
            "matching_stress": JSON.parse(req.body.matching_stress),
            "matching_proficiency": JSON.parse(req.body.matching_proficiency),
            "matching_diagnosis": JSON.parse(req.body.matching_diagnosis)
        };
        async.waterfall(
            [
                function (callback) {
                    //file upload
                    if (req.files && req.files["tech_type"]) {
                        var image_path_array = [];
                        var file = req.files['tech_type'];
                        var files = [].concat(req.files.tech_type);
                        var dir = "./upload";
                        var filename = file.name;
                        async.eachSeries(
                            files,
                            function (file, loop_callback) {
                                var mimetype = path.extname(file.name);
                                var mimetype = ["image/jpeg", "image/png", 'audio/aac', 'audio/mp3', 'audio/mpeg', 'video/mpeg', 'video/ogg', 'video/webm', 'video/3gpp', 'video/3gpp2'];
                                if (mimetype.indexOf((file.mimetype).toLowerCase()) != -1) {
                                    if (!fs.existsSync(dir)) {
                                        fs.mkdirSync(dir);
                                    }
                                    var filename = file.name;
                                    file.mv(dir + "/" + filename, function (err) {
                                        if (err) {
                                            logger.error("There was an issue in uploading");
                                            loop_callback({
                                                status: config.MEDIA_ERROR_STATUS,
                                                err: "There was an issue in uploading"
                                            });
                                        } else {
                                            logger.trace(
                                                "image has been uploaded. File name = ",
                                                filename
                                            );
                                            location = filename;
                                            image_path_array.push(location);
                                            loop_callback();
                                        }
                                    });
                                } else {
                                    logger.error(" format is invalid");
                                    loop_callback({
                                        status: config.VALIDATION_FAILURE_STATUS,
                                        err: " format is invalid"
                                    });
                                }
                            },
                            function (err) {
                                if (err) {
                                    res.status(err.status).json(err);
                                } else {
                                    callback(null, image_path_array);
                                }
                            }
                        );
                    } else {
                        logger.info(
                            "File not available to upload. Executing next instruction"
                        );
                        callback(null, []);
                    }
                }
            ],
            async (err, image_path_array) => {
                obj.tech_type = image_path_array;
                var patient = await common_helper.insert(Wellness, obj);
                if (patient.status === 0) {
                    res.status(config.INTERNAL_SERVER_ERROR).json(patient);
                } else {
                    res.json({ "message": "Wellness practices added successfully", "data": patient })
                }

            });
    }
    else {
        logger.error("Validation Error = ", errors);
        res.status(config.BAD_REQUEST).json({ message: errors });
    }
});


// Get all Wellness practices
router.get("/wellness_practices", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(Wellness, { "is_del": false });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var resp_data = await common_helper.findWithFilter(Wellness, { "is_del": false }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


//Wellness pracices details
router.get("/wellness_practices/:id", async (req, res) => {
    id = req.params.id;
    if (id.length != 24) {
        res.status(config.BAD_REQUEST).json({ "message": "Your id must be 24 characters" });
    } else {
        var resp_data = await common_helper.findOne(Wellness, { "_id": new ObjectId(req.params.id), "is_del": false }, 1, '');
        if (resp_data.status == 0) {
            logger.error("Error occured while fetching User = ", resp_data);
            res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
        } else {
            logger.trace("User got successfully = ", resp_data);
            res.status(config.OK_STATUS).json(resp_data);
        }
    }
});


module.exports = router;