var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');

var common_helper = require('../../helpers/common_helper');
var Practice = require('../../models/practices');
var Answer = require('../../models/answer');
var Patient = require('../../models/patient');


//get all practices
router.post("/", async (req, res) => {
    var total_user = await Patient.countDocuments();
    var male_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Male"
            }
        }
    ]

    var female_aggregate = [

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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Female"
            }
        }
    ]

    var other_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Other"
            }
        }
    ]


    let female_data = await Answer.aggregate(female_aggregate);
    let male_data = await Answer.aggregate(male_aggregate);
    let other_data = await Answer.aggregate(other_aggregate);

    var native_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Alakan or Native American"
            }
        }
    ]
    var asian_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Asian"
            }
        }
    ]
    var black_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Black or African American"
            }
        }
    ]
    var latino_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Hispanic or Latino"
            }
        }
    ]
    var pacific_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "Native Hawaiian or Other Pacific Islander"
            }
        }
    ]
    var white_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": "White"
            }
        }
    ]

    let native_data = await Answer.aggregate(native_aggregate);
    let asian_data = await Answer.aggregate(asian_aggregate);
    let black_data = await Answer.aggregate(black_aggregate);
    let latino_data = await Answer.aggregate(latino_aggregate);
    let pacific_data = await Answer.aggregate(pacific_aggregate);
    let white_data = await Answer.aggregate(white_aggregate);

    var diagnosis_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": req.body.diagnosis
            }
        }
    ]

    let diagnosis_data = await Answer.aggregate(diagnosis_aggregate);


    var stress_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "answers.sequence": 13,
                "value": { $ne: "n/a" }
            }
        },

        {
            "$group": {
                "_id": "$options._id",
                count: { $sum: 1 },
                value: { $first: '$value' },
            }
        },

    ]

    let stress_data = await Answer.aggregate(stress_aggregate);
    //console.log('stress_data', stress_data);
    //res.status(config.OK_STATUS).json({ stress_data });


    var symptom_aggregate = [
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
            $lookup: {
                from: "option",
                localField: "option_id",
                foreignField: "_id",
                as: "options"
            }
        },
        {
            $unwind: '$options'
        },
        {
            $match: {
                "options.title": req.body.symptom,
                "answers.sequence": 5
            }
        }
    ]

    let symptom_data = await Answer.aggregate(symptom_aggregate);

    res.status(config.OK_STATUS).json({
        "male": male_data.length, "male_percentage": (male_data.length / total_user) * 100,
        "female": male_data.length, "female_percentage": (female_data.length / total_user) * 100,
        "other": other_data.length, "other_percentage": (other_data.length / total_user) * 100,
        "alaskan": native_data.length, "alaskan_percentage": (native_data.length / total_user) * 100,
        "asian": asian_data.length, "asian_percentage": (asian_data.length / total_user) * 100,
        "african": black_data.length, "african_percentage": (black_data.length / total_user) * 100,
        "latino": latino_data.length, "latino_percentage": (latino_data.length / total_user) * 100,
        "pacific": pacific_data.length, "pacific_percentage": (pacific_data.length / total_user) * 100,
        "white": white_data.length, "white_percentage": (white_data.length / total_user) * 100,
        "diagnosis": diagnosis_data.length, "diagnosis_percentage": (diagnosis_data.length / total_user) * 100,
        "symptom": symptom_data.length,
    });
});


module.exports = router;