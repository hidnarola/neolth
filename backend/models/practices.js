//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PracticesModelSchema = new Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    name: { type: String },
    practice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'wellness_practices' },
    is_del: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

var Practices = mongoose.model('practices', PracticesModelSchema, 'practices');

module.exports = Practices;