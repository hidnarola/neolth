//Require Mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

//Define a schema
var Schema = mongoose.Schema;

var HcpModelSchema = new Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    phone_number: { type: String, default: null },
    username: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    name: { type: String, default: null },
    user_type: { type: String, default: "parent" },
    sex: { type: String, enum: ["male", "female"] },
    degree: { type: String, default: null },
    speciality: { type: String, default: null },
    //license: { type: String, required: true },
    practice_name: { type: String, default: null },
    practice_solution: { type: String, default: null },
    verification: { type: String },
    participating_provider: { type: String, enum: ["yes", "no"], default: "no" },
    flag: { type: Number, default: 1 },
    status: { type: String, enum: ["active", "deactive"], default: "deactive" },
    is_del: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });


HcpModelSchema.pre('save', function (next) {
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

var Hcp = mongoose.model('hcp', HcpModelSchema, 'hcp');

module.exports = Hcp;