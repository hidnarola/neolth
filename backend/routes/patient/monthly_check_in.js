var express = require('express');
var router = express.Router();
var config = require('../../config');
var logger = config.logger;
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');

var common_helper = require('../../helpers/common_helper');
var Answer = require('../../models/answer');
var Question = require('../../models/question');
var WellnessPractice = require('../../models/wellness_practices');
var Tag = require('../../models/tag');
var Patient = require('../../models/patient');
var HCP = require('../../models/hcp');
var Practice = require('../../models/practices');


// Patient Monthly Check in
router.post("/", async (req, res) => {
    var schema = {
    };
    req.checkBody(schema);
    var errors = req.validationErrors();
    if (!errors) {
        const { answers } = req.body;
        const ansArr = [];
        answers.map((o, i) => {
            let newOption = {
                question_id: o.question_id,
                option_id: o.option_id,
                //: { value: o.value },
            };
            ansArr.push(newOption);
        });
        var aggregate = [
            {
                $lookup: {
                    from: "option",
                    localField: "_id",
                    foreignField: "question_id",
                    as: "options"
                }
            }
        ]
        let data = await Question.aggregate(aggregate);

        const answer = [];
        const diagnosisArr = [];
        const symptomArr = [];

        const practiceArr = [];
        for (const d of data) {
            const options = d.options;
            for (const o of options) {
                const oId = o._id;
                for (const a of answers) {
                    if ((oId.toString()) === (a.option_id.toString())) {
                        answer.push({
                            question_id: d._id,
                            option_id: oId,
                            value: a.value,
                            patient_id: req.userInfo.id
                        });
                    }

                    if (d.sequence == 5 && (oId.toString()) === (a.option_id.toString())) {
                        symptomArr.push(o.value.value.tag)
                    }
                    if (d.sequence == 13 && (oId.toString()) === (a.option_id.toString())) {
                        for (const value of (o.value.value)) {
                            for (const a of answers) {
                                if (value.value == 1 && a.value == 1 || value.value == 2 && a.value == 2) {
                                    console.log('no');
                                }
                                else if (value.value == 3 && a.value == 3 || value.value == 4 && a.value == 4 || value.value == 5 && a.value == 5) {
                                    practiceArr.push(o.tag)
                                }
                            }
                        }
                    }

                }
            }
        }
        for (const a of answer) {
            var delete_resp = await Answer.deleteMany({ "patient_id": req.userInfo.id, "question_id": a.question_id });
        }
        var health_resp = await common_helper.insertMany(Answer, answer);
        var practice_uniq = _.uniq(practiceArr);
        var tag_resp = await common_helper.update(Tag, { "patient_id": req.userInfo.id }, { $set: { "symptoms": symptomArr, "practice_type": practice_uniq } });
        if (tag_resp.status == 0) {
            logger.debug("Error = ", tag_resp.error);
            res.status(config.INTERNAL_SERVER_ERROR).json(tag_resp);
        } else {
            logger.trace("Tags have been assigned successfully");

            prof = tag_resp.data.proficiency;
            prac = (tag_resp.data.practice_type).sort();
            stres = (tag_resp.data.stress_style).sort();
            sympt = (tag_resp.data.symptoms).sort();
            diag = (tag_resp.data.diagnosis).sort();
            var stress_data = [];
            var pract_arr = [];
            var symptom_data = [];
            var proficncy_arr = await WellnessPractice.find({ "matching_proficiency": { $eq: prof } })
            for (const p of proficncy_arr) {
                var prac_arr = _.intersection(prac, p.practice_type)
                if (prac_arr.length >= 1) {
                    pract_arr.push(p);
                }

            }
            function compare(stress_match, stres, s) {
                stress_match.forEach((e1) => stres.forEach((e2) => {
                    if (e1 === e2) {
                        stress_data.push(s);
                    }
                }
                ));
            }
            for (const s of pract_arr) {
                if (s.matching_stress.length == stres.length) {
                    var stress_match = (s.matching_stress).sort();
                    compare(stress_match, stres, s)
                }
            }
            for (const symp of stress_data) {
                var sym_arr = _.intersection(symp.matching_symptom, sympt)
                if (sym_arr.length >= 1) {
                    symptom_data.push(symp);
                }
            }
            var id = [];
            var data_ins = [];
            if (symptom_data.length == 5) {
                for (const a of symptom_data) {
                    var obj = {
                        "patient_id": req.userInfo.id,
                        "practice_id": (a._id).toString()
                    }
                    data_ins.push(obj);
                }
                var insert_practices = await Practice.insertMany(data_ins);
            } else {
                var size = 5 - symptom_data.length
                for (const symp of symptom_data) {
                    id.push(symp._id);
                }

                var data_size = await WellnessPractice.aggregate([
                    // {
                    //     $match: {
                    //         "_id": { $in: { $ne: (id) } }
                    //     }
                    // },
                    {
                        $sample: { size: size }
                    },

                ])
                symptom_data = symptom_data.concat(data_size);
                for (const a of symptom_data) {
                    var obj = {
                        "patient_id": req.userInfo.id,
                        "practice_id": (a._id).toString()
                    }
                    data_ins.push(obj)
                }
                var insert_practices = await Practice.insertMany(data_ins);
            }
            res.json({ "message": "Answer added successfully", "data": health_resp })
        }
    }
    else {
        logger.error("Validation Error = ", errors);
        res.status(config.BAD_REQUEST).json({ message: errors });
    }
});


module.exports = router;