//Require Mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

//Define a schema
var Schema = mongoose.Schema;

var HeatlthCheckInModelSchema = new Schema({
    emotional_health: { type: String, deafault: null, deafault: null },
    physical_health: { type: String, deafault: null },
    sleep_quality: { type: String, deafault: null },
    energy_level: { type: String, deafault: null },
    stress_level: { type: String, deafault: null },
    stress_triggers: { type: String, deafault: null },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    flag: { type: Number, default: 1 },
    status: { type: String, enum: ["active", "deactive", "pending"], default: "pending" },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

var HealthCheckIn = mongoose.model('heathcheckin', HeatlthCheckInModelSchema, 'heathcheckin');

module.exports = HealthCheckIn;