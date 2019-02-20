var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');

var common_helper = require('../../helpers/common_helper');
var Practice = require('../../models/practices');
var Answer = require('../../models/answer');


//get all practices
router.post("/", async (req, res) => {
    var totalMatchingCountRecords = await common_helper.count(Practice, { "is_del": false, "patient_id": req.userInfo.id });
    var sortOrderColumnIndex = req.body.order[0].column;
    let sortOrderColumn = sortOrderColumnIndex == 0 ? '_id' : req.body.columns[sortOrderColumnIndex].data;
    let sortOrder = req.body.order[0].dir == 'asc' ? 1 : -1;
    let sortingObject = {
        [sortOrderColumn]: sortOrder
    }
    var practices_recieved = await common_helper.findWithFilters(Practice, { "is_del": false, "patient_id": req.userInfo.id }, req.body.start, req.body.length, totalMatchingCountRecords, sortingObject, 'practice_id', '', '');
    var sequence_array = [7, 8, 9, 10, 11];
    var aggregate = [
        {
            $lookup: {
                from: "question",
                localField: "question_id",
                foreignField: "_id",
                as: "answers"
            }
        },
        {
            $unwind: '$answers'
        },
        {
            $match: {
                "answers.sequence": { $in: sequence_array }
            }
        }
    ]
    let data = await Answer.aggregate(aggregate);
    if (practices_recieved.status == 0) {
        logger.error("Error occured while fetching User = ", practices_recieved);
        res.status(config.INTERNAL_SERVER_ERROR).json(practices_recieved);
    } else {
        logger.trace("User got successfully = ", practices_recieved);
        res.status(config.OK_STATUS).json({ "practices_received": practices_recieved, "monthly_health_status": data });
    }
});



module.exports = router;