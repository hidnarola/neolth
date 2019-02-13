//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AnswerModelSchema = new Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'question' },
    option_id: { type: mongoose.Schema.Types.ObjectId, ref: 'option' },
    value: { type: Object, default: null },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

var Answer = mongoose.model('answer', AnswerModelSchema, 'answer');

module.exports = Answer;