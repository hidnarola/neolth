//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var QuestionModelSchema = new Schema({
    question: { type: String, required: true },
    option_type: { type: String, required: true },
    note: { type: String, required: false, default: null },
    instructions: { type: String, required: false, default: null },
    example: { type: String, required: false, default: null },
    sequence: { type: Number, required: true },
    algorithm: { type: String, enum: ["yes", "no"], default: "no" },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

var Question = mongoose.model('question', QuestionModelSchema, 'question');

module.exports = Question;