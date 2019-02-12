//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var OptionModelSchema = new Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'question' },
    title: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Object, default: null },
    tag: { type: String, required: false, default: null },
    row: { type: Number, default: 0 },
    algorithm: { type: String, enum: ["yes", "no"], default: "no" },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

var Option = mongoose.model('option', OptionModelSchema, 'option');

module.exports = Option;