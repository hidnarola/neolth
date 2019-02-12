var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;

var common_helper = require('../../helpers/common_helper');
var Question = require('../../models/question');
var Option = require('../../models/option');
var ObjectId = require('mongodb').ObjectID;

var mongoose = require('mongoose');
var _ = require('underscore');


//Add questions
router.post("/add", async (req, res) => {
    var schema = {
        "question": {
            notEmpty: true,
            errorMessage: "Question is required"
        }
    };
    req.checkBody(schema);
    var errors = req.validationErrors();
    if (!errors) {
        const { options, option_type } = req.body;
        var obj = {
            "question": req.body.question,
            "option_type": req.body.option_type,
            sequence: req.body.sequence,
        };
        if (req.body.algorithm) {
            obj.algorithm = req.body.algorithm
        }
        var question = await common_helper.insert(Question, obj)
        if (question.status === 0) {
            res.status(config.INTERNAL_SERVER_ERROR).json(question);
        } else {
            const questionId = question.data._id;
            const optionsArr = [];
            options.map((o, i) => {
                let newOption = {
                    question_id: questionId,
                    title: o.title,
                    row: o.row,
                    value: { value: o.value },
                    tag: o.tag,
                    algorithm: req.body.algorithm,
                    type: option_type,
                };
                optionsArr.push(newOption);
            });
            await common_helper.insertMany(Option, optionsArr);
            res.json({ "message": "Questions added successfully", "data": question })
        }
    }
    else {
        logger.error("Validation Error = ", errors);
        res.status(config.BAD_REQUEST).json({ message: errors });
    }
});


// Get all questions
router.post("/get", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(Question, { "is_del": false });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var resp_data = await common_helper.findWithFilter(Question, { "is_del": false }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


//delete question
router.post('/delete', async (req, res) => {
    var tmp = _.map(req.body.id, function (id) { return ObjectId(id) });
    let ids = tmp;
    var del_id = await common_helper.findOne(Question, { "_id": req.body.id }, 1)
    if (del_id.status == 1) {
        var que_resp = await Question.updateMany({ _id: { $in: ids } }, { $set: { "is_del": true } })
        if (que_resp.status == 0) {
            logger.debug("Error = ", que_resp.error);
            res.status(config.INTERNAL_SERVER_ERROR).json(que_resp);
        } else {
            logger.trace("User Interest has been inserted");
            var option_resp = await Option.updateMany({ question_id: { $in: ids } }, { $set: { "is_del": true } })
            res.json({ "message": "Question has been deleted successfully", "data": que_resp })
        }
    }
    else {
        res.status(config.BAD_REQUEST).json({ message: "Id does not exist" });
    }
});


module.exports = router;