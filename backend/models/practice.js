//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PracticeModelSchema = new Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    wellness_practice: { type: mongoose.Schema.Types.ObjectId, ref: 'wellness_practices' },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

var Practice = mongoose.model('practice', PracticeModelSchema, 'practice');

module.exports = Practice;