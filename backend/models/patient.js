//Require Mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

//Define a schema
var Schema = mongoose.Schema;

var PatientModelSchema = new Schema({
    username: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    phone_number: { type: String },
    dob: { type: Date, default: Date.now },
    email: { type: String, required: true },
    password: { type: String },
    referral: { type: String, unique: true },
    physician: { type: String },
    referral_code: { type: String },
    hcp_id: { type: mongoose.Schema.Types.ObjectId, ref: 'hcp' },
    flag: { type: Number, default: 1 },
    status: { type: String, enum: ["active", "deactive", "pending"], default: "pending" },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });


PatientModelSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one                                
            user.password = hash;
            next();
        });
    });

});

var Patient = mongoose.model('patient', PatientModelSchema, 'patient');

module.exports = Patient;