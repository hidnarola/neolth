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


// Patient Health Check in
router.post("/health_check_in", async (req, res) => {
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

        var proficiency_tags = [];
        var stress_style;
        var remunaration_sum = 0;
        var avoidance_sum = 0;
        var repression_sum = 0;
        var sum = 0;
        const practiceArr = [];
        for (const d of data) {
            const options = d.options;
            for (const o of options) {
                const oId = o._id;
                for (const a of answers) {
                    if ((oId.toString()) === (a.option_id.toString())) {
                        answer.push({
                            value: a.value,
                            patient_id: req.userInfo.id,
                            question_id: d._id,
                            option_id: oId,
                        });
                    }

                    if (d.sequence == 3 && (oId.toString()) === (a.option_id.toString())) {
                        diagnosisArr.push(o.value.value.tag)
                    }
                    else if (d.sequence == 5 && (oId.toString()) === (a.option_id.toString())) {
                        symptomArr.push(o.value.value.tag)
                    }
                    else if (d.sequence == 13 && (oId.toString()) === (a.option_id.toString())) {
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
                    else if (d.sequence == 12 && (oId.toString()) === (a.option_id.toString())) {
                        var remunaration_arr = [2, 5, 10, 15, 18, 23, 26, 31];
                        var avoidance_arr = [3, 6, 11, 14, 19, 21, 27, 29];
                        var repression_arr = [4, 8, 12, 13, 20, 22, 28, 30];
                        var proficin_arr = [1, 7, 9, 16, 17, 24, 25, 32]
                        if (remunaration_arr.indexOf(o.row) >= 0) {
                            for (const value of (o.value.value)) {
                                if ((oId.toString()) === (a.option_id.toString())) {
                                    if (value.value == a.value) {
                                        remunaration_sum += (a.value);
                                    }
                                }
                            }
                        }
                        else if (avoidance_arr.indexOf(o.row) >= 0) {
                            for (const value of (o.value.value)) {
                                if ((oId.toString()) === (a.option_id.toString())) {
                                    if (value.value == a.value) {
                                        avoidance_sum += (a.value);
                                    }
                                }
                            }
                        }
                        else if (repression_arr.indexOf(o.row) >= 0) {
                            for (const value of (o.value.value)) {
                                if ((oId.toString()) === (a.option_id.toString())) {
                                    if (value.value == a.value) {
                                        repression_sum += (a.value)
                                    }
                                }
                            }
                        }
                        if (proficin_arr.indexOf(o.row) >= 0) {
                            for (const value of (o.value.value)) {
                                if ((oId.toString()) === (a.option_id.toString())) {
                                    if (value.value == a.value) {
                                        sum += (a.value);
                                    }
                                }
                            }
                        }
                        if ((remunaration_sum > avoidance_sum) && (remunaration_sum > repression_sum)) {
                            stress_style = "Remunaration";
                        }
                        else if ((avoidance_sum > remunaration_sum) && (avoidance_sum > repression_sum)) {
                            stress_style = "Avoidance";

                        }
                        else if ((repression_sum > remunaration_sum) && (repression_sum > avoidance_sum)) {
                            stress_style = "Repression";
                        }
                        if (sum < 11) {
                            proficiency_tags = "beginner";
                        }
                        else if (sum < 22 && sum > 10) {
                            proficiency_tags = "intermediate";
                        }
                        else if (sum < 33 && sum > 22) {
                            proficiency_tags = "advanced";
                        }
                    }
                }
            }
        }
        var health_resp = await common_helper.insertMany(Answer, answer);
        var practice_uniq = _.uniq(practiceArr);

        var tag = {
            "patient_id": req.userInfo.id,
            "diagnosis": diagnosisArr,
            "symptoms": symptomArr,
            "practice_type": practice_uniq,
            "proficiency": proficiency_tags,
            "stress_style": stress_style
        }
        var tag_resp = await common_helper.insert(Tag, tag);
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


// Update profile data
router.put("/", async (req, res) => {
    user_id = req.userInfo.id;
    var obj = {
    };
    if (req.body.username) {
        obj.username = req.body.username;
    }
    if (req.body.email) {
        obj.email = req.body.email;
    }
    if (req.body.phone_number) {
        obj.phone_number = req.body.phone_number;
    }
    var resp_datas = await common_helper.findOnes(Patient, { "_id": req.userInfo.id }, 1);
    if (resp_datas && resp_datas.data) {
        var hcp_email = await common_helper.findOne(HCP, { "email": req.body.email, "is_del": false }, 1)
        var patient_email = await common_helper.findOne(Patient, { "email": req.body.email, "is_del": false, "_id": { $ne: (new ObjectId(req.userInfo.id)) } }, 1)
        if (hcp_email.status === 2 && patient_email.status === 2) {
            var hcp_update = await common_helper.update(Patient, { "_id": req.userInfo.id }, obj)
            res.json({ "message": "Updated successfully", "data": hcp_update })
        }
        else {
            res.status(config.BAD_REQUEST).json({ message: "Email already exist" });
        }
    } else {
        res.status(config.BAD_REQUEST).json({ "message": "No data found" });
    }
});


//get hcp profile data
router.get("/", async (req, res) => {
    var resp_data = await common_helper.findOne(Patient, { "_id": new ObjectId(req.userInfo.id) }, 1);
    if (resp_data.status == 0) {
        logger.error("Error occured while fetching User = ", resp_data);
        res.status(config.INTERNAL_SERVER_ERROR).json(resp_data);
    } else {
        logger.trace("User got successfully = ", resp_data);
        res.status(config.OK_STATUS).json(resp_data);
    }
});


module.exports = router;