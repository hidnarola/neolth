//Require Mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

//Define a schema
var Schema = mongoose.Schema;

var WellnessPracticesModelSchema = new Schema({
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
    name: { type: String, required: true },
    tech_type: [{ type: String }],
    practice_type: { type: String, required: true },
    practice_content: { type: String, required: true },
    matching_symptom: [{ type: String, required: true }],
    matching_stress: [{ type: String, required: true }],
    matching_proficiency: [{ type: String, required: true }],
    matching_diagnosis: [{ type: String, required: true }],
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });


var WellnessPractices = mongoose.model('wellness_practices', WellnessPracticesModelSchema, 'wellness_practices');

module.exports = WellnessPractices;