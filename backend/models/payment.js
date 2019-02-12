//Require Mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

//Define a schema
var Schema = mongoose.Schema;

var PaymentModelSchema = new Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    name: { type: String, required: true },
    card_type: { type: String, required: true },
    card_number: { type: String, required: true, unique: true },
    billing_address: { type: String, required: true },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });


var Payment = mongoose.model('payment', PaymentModelSchema, 'payment');

module.exports = Payment;