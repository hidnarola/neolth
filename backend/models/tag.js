//Require Mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

//Define a schema
var Schema = mongoose.Schema;

var TagModelSchema = new Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    diagnosis: [{ type: String }],
    symptoms: [{ type: String }],
    proficiency: [{ type: String }],
    stress_style: [{ type: String }],
    practice_type: [{ type: String }],
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });



var Tag = mongoose.model('tag', TagModelSchema, 'tag');

module.exports = Tag;