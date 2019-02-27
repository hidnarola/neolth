//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SelfActivityModelSchema = new Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    date: { type: Date, default: Date.now },
    activity_name: { type: String },
    description: { type: String },
    is_del: { type: Boolean, default: false },
    // status: { type: String, default: "pending" },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

var Self_Activity = mongoose.model('self_activity', SelfActivityModelSchema, 'self_activity');

module.exports = Self_Activity;