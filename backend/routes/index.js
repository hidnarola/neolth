var express = require('express');
var router = express.Router();

/* GET home page. */
var express = require('express');
var router = express.Router();
var config = require('../config');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
//var ObjectId = mongoose.Types.ObjectId;
//var moment = require('moment');
var _ = require('underscore');
var passwordValidator = require('password-validator');
var passwordValidatorSchema = new passwordValidator();



var logger = config.logger;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var async = require('async');
var mail_helper = require('./../helpers/mail_helper');
const saltRounds = 10;
var common_helper = require('./../helpers/common_helper')
var Patient = require('../models/patient');
var HCP = require('../models/hcp');
var Payment = require('../models/payment');
var Admin = require('../models/admin');

var btoa = require('btoa');

// HCP Registration
router.post("/hcp_register", async (req, res) => {
  var schema = {
    "username": {
      notEmpty: true,
      errorMessage: "UserName is required"
    },
    "email": {
      notEmpty: true,
      errorMessage: "Email is required"
    },
    "password": {
      notEmpty: true,
      errorMessage: "Password is required"
    },
    "sex": {
      notEmpty: true,
      errorMessage: "Sex is required"
    },
    "degree": {
      notEmpty: true,
      errorMessage: "Degree is required"
    },
    "speciality": {
      notEmpty: true,
      errorMessage: "Speciality is required"
    },
    "phone_number": {
      notEmpty: true,
      errorMessage: "Phone Number is required"
    },
    // "license": {
    //   notEmpty: true,
    //   errorMessage: "License is required"
    // },
    "practice_name": {
      notEmpty: true,
      errorMessage: "Practice Name is required"
    },
    "practice_solution": {
      notEmpty: true,
      errorMessage: "Practice Solurion is required"
    },
    "practice_location": {
      notEmpty: true,
      errorMessage: "Practice Location is required"
    },
    "participating_provider": {
      notEmpty: true,
      errorMessage: "Participating Provider is required"
    }
  };
  req.checkBody(schema);
  var errors = req.validationErrors();
  if (!errors) {
    var reg_obj = {
      "username": req.body.username,
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "email": req.body.email,
      "password": req.body.password,
      "phone_number": req.body.phone_number,
      "name": req.body.name,
      "sex": req.body.sex,
      "degree": req.body.degree,
      "speciality": req.body.speciality,
      "license": req.body.license,
      "practice_name": req.body.practice_name,
      "practice_solution": req.body.practice_solution,
      "participating_provider": req.body.participating_provider
    };
    async.waterfall(
      [
        function (callback) {
          //file upload
          if (req.files && req.files["verification"]) {
            var image_path_array = [];
            var file = req.files['verification'];
            var files = [].concat(req.files.verification);
            var dir = "./upload";
            var filename = file.name;
            async.eachSeries(
              files,
              function (file, loop_callback) {
                var mimetype = path.extname(file.name);
                var mimetype = ["image/jpeg", 'application/pdf'];
                if (mimetype.indexOf((file.mimetype).toLowerCase()) != -1) {
                  if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                  }

                  var filename = file.name;
                  file.mv(dir + "/" + filename, function (err) {
                    if (err) {
                      logger.error("There was an issue in uploading");
                      loop_callback({
                        status: config.MEDIA_ERROR_STATUS,
                        err: "There was an issue in uploading"
                      });
                    } else {
                      logger.trace(
                        "image has been uploaded. File name = ",
                        filename
                      );
                      location = filename;
                      image_path_array.push(location);
                      loop_callback();
                    }
                  });
                } else {
                  logger.error(" format is invalid");
                  loop_callback({
                    status: config.VALIDATION_FAILURE_STATUS,
                    err: " format is invalid"
                  });
                }
              },
              function (err) {
                if (err) {
                  res.status(err.status).json(err);
                } else {
                  callback(null, image_path_array);
                }
              }
            );
          } else {
            logger.info(
              "File not available to upload. Executing next instruction"
            );
            callback(null, []);
          }
        }
      ],
      async (err, image_path_array) => {
        reg_obj.verification = image_path_array;
        let hcp = await common_helper.findOne(HCP, { "email": req.body.email, "is_del": false }, 1)
        let patient = await common_helper.findOne(Patient, { "email": req.body.email, "is_del": false }, 1)
        if (hcp.status === 2 && patient.status === 2) {
          var interest_resp = await common_helper.insert(HCP, reg_obj);
          if (interest_resp.status == 0) {
            logger.debug("Error = ", interest_resp.error);
            res.status(config.INTERNAL_SERVER_ERROR).json(interest_resp);
          } else {
            logger.trace("HCP Registration has been inserted");
            res.json({ "message": "Thank you for the registration. We will contact you with more details.", "data": interest_resp })
          }
        } else {
          res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Email already exist" });
        }
      });
  }
  else {
    logger.error("Validation Error = ", errors);
    res.status(config.BAD_REQUEST).json({ message: errors });
  }
});


//HCP login
router.post('/hcp_login', async (req, res) => {
  var schema = {
    'email': {
      notEmpty: true,
      errorMessage: "Email is required.",
      isEmail: { errorMessage: "Please enter valid email address" }
    },
    'password': {
      notEmpty: true,
      errorMessage: "password is required."
    },
  };
  req.checkBody(schema);
  var errors = req.validationErrors();
  if (!errors) {
    let login_resp = await common_helper.findOne(HCP, { "email": req.body.email }, 1)
    if (login_resp.status === 0) {
      logger.trace("Login checked resp = ", login_resp);
      res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Something went wrong while finding user", "error": login_resp.error });
    } else if (login_resp.status === 1) {
      logger.trace("valid token. Generating token");
      if (login_resp.data.status == "active" && login_resp.data.is_del == false) {
        if (bcrypt.compareSync(req.body.password, login_resp.data.password) && req.body.email == login_resp.data.email) {
          var refreshToken = jwt.sign({ id: login_resp.data._id }, config.REFRESH_TOKEN_SECRET_KEY, {});
          let update_resp = await common_helper.update(HCP, { "_id": login_resp.data._id }, { "refresh_token": refreshToken, "last_login": Date.now() });
          var LoginJson = { id: login_resp.data._id, email: login_resp.email, role: "hcp" };

          var token = jwt.sign(LoginJson, config.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: config.ACCESS_TOKEN_EXPIRE_TIME
          });
          delete login_resp.data.status;
          delete login_resp.data.password;
          delete login_resp.data.refresh_token;
          delete login_resp.data.last_login_date;
          delete login_resp.data.created_at;

          logger.info("Token generated");
          res.status(config.OK_STATUS).json({ "status": 1, "message": "Logged in successful", "data": login_resp.data, "token": token, "refresh_token": refreshToken });
        }
        else {
          res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Invalid email address or password" });
        }
      } else {
        res.status(config.BAD_REQUEST).json({ message: "You Are Account is not active" });
      }
    } else {
      res.status(config.BAD_REQUEST).json({ message: "Your email is not registered" });
    }
  }
  else {
    res.status(config.BAD_REQUEST).json({ message: "Invalid email" });
  }
});


//Admin login
router.post('/admin_login', async (req, res) => {
  var schema = {
    'email': {
      notEmpty: true,
      errorMessage: "Email is required.",
      isEmail: { errorMessage: "Please enter valid email address" }
    },
    'password': {
      notEmpty: true,
      errorMessage: "password is required."
    },
  };
  req.checkBody(schema);
  var errors = req.validationErrors();
  if (!errors) {
    let login_resp = await common_helper.findOne(Admin, { "email": req.body.email }, 1)
    if (login_resp.status === 0) {
      logger.trace("Login checked resp = ", login_resp);
      res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Something went wrong while finding user", "error": login_resp.error });
    } else if (login_resp.status === 1) {
      logger.trace("valid token. Generating token");
      if (bcrypt.compareSync(req.body.password, login_resp.data.password) && req.body.email == login_resp.data.email) {
        var refreshToken = jwt.sign({ id: login_resp.data._id }, config.REFRESH_TOKEN_SECRET_KEY, {});
        let update_resp = await common_helper.update(Admin, { "_id": login_resp.data._id }, { "refresh_token": refreshToken, "last_login": Date.now() });
        var LoginJson = { id: login_resp.data._id, email: login_resp.email, role: "admin" };

        var token = jwt.sign(LoginJson, config.ACCESS_TOKEN_SECRET_KEY, {
          expiresIn: config.ACCESS_TOKEN_EXPIRE_TIME
        });
        delete login_resp.data.status;
        delete login_resp.data.password;
        delete login_resp.data.refresh_token;
        delete login_resp.data.last_login_date;
        delete login_resp.data.created_at;

        logger.info("Token generated");
        res.status(config.OK_STATUS).json({ "status": 1, "message": "Logged in successful", "data": login_resp.data, "token": token, "refresh_token": refreshToken });
      }
      else {
        res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Invalid email address or password" });
      }
    } else {
      res.status(config.BAD_REQUEST).json({ message: "Your email is not registered" });
    }
  }
  else {
    res.status(config.BAD_REQUEST).json({ message: "Invalid email" });
  }
});


// Patient Registration
router.post("/patient_register", async (req, res) => {
  var schema = {
    "username": {
      notEmpty: true,
      errorMessage: "UserName is required"
    },
    "email": {
      notEmpty: true,
      errorMessage: "Email is required"
    },
    "password": {
      notEmpty: true,
      errorMessage: "Password is required"
    },
    "referral_code": {
      notEmpty: true,
      errorMessage: "Refferal Code is required"
    },
    "phone_number": {
      notEmpty: true,
      errorMessage: "Phone Number is required"
    },

  };
  req.checkBody(schema);
  var errors = req.validationErrors();
  if (!errors) {
    var reg_obj = {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "dob": req.body.dob,
      "username": req.body.username,
      "email": req.body.email,
      "password": req.body.password,
      "phone_number": req.body.phone_number,
      "address": req.body.address,
      "status": "active"
    };

    let patient = await common_helper.findOne(Patient, { "email": req.body.email, "is_del": false, "referral_code": req.body.refferal_code }, 1)
    if (patient.status === 0) {
      res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Email or refferal code is wrong" });
    } else {
      var interest_resp = await common_helper.insert(Patient, reg_obj);
      var obj = {
        patient_id: interest_resp.data._id,
        name: req.body.name,
        card_type: req.body.card_type,
        card_number: req.body.card_number,
        billing_address: req.body.billing_address,
      };
      var interest_response = await common_helper.insert(Payment, obj);
      var delete_old = await common_helper.delete(Patient, { "email": req.body.email, "status": "pending" });
      res.json({ "message": "Patient registered successfully", "data": interest_resp })
    }
  }
  else {
    logger.error("Validation Error = ", errors);
    res.status(config.BAD_REQUEST).json({ message: errors });
  }
});


//Patient login
router.post('/patient_login', async (req, res) => {
  var schema = {
    'email': {
      notEmpty: true,
      errorMessage: "Email is required.",
      isEmail: { errorMessage: "Please enter valid email address" }
    },
    'password': {
      notEmpty: true,
      errorMessage: "password is required."
    },
  };
  req.checkBody(schema);
  var errors = req.validationErrors();
  if (!errors) {
    let login_resp = await common_helper.findOne(Patient, { "email": req.body.email }, 1)
    if (login_resp.status === 0) {
      logger.trace("Login checked resp = ", login_resp);
      res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Something went wrong while finding user", "error": login_resp.error });
    } else if (login_resp.status === 1) {
      logger.trace("valid token. Generating token");
      if (login_resp.data.status == "active" && login_resp.data.is_del == false) {
        if (bcrypt.compareSync(req.body.password, login_resp.data.password) && req.body.email == login_resp.data.email) {
          var refreshToken = jwt.sign({ id: login_resp.data._id }, config.REFRESH_TOKEN_SECRET_KEY, {});
          let update_resp = await common_helper.update(Patient, { "_id": login_resp.data._id }, { "refresh_token": refreshToken, "last_login": Date.now() });
          var LoginJson = { id: login_resp.data._id, email: login_resp.email, role: "patient" };

          var token = jwt.sign(LoginJson, config.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: config.ACCESS_TOKEN_EXPIRE_TIME
          });
          delete login_resp.data.status;
          delete login_resp.data.password;
          delete login_resp.data.refresh_token;
          delete login_resp.data.last_login_date;
          delete login_resp.data.created_at;

          logger.info("Token generated");
          res.status(config.OK_STATUS).json({ "status": 1, "message": "Logged in successful", "data": login_resp.data, "token": token, "refresh_token": refreshToken });
        }
        else {
          res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Invalid email address or password" });
        }
      } else {
        res.status(config.BAD_REQUEST).json({ message: "You Are Account is not active" });
      }
    } else {
      res.status(config.BAD_REQUEST).json({ message: "Your email is not registered" });
    }
  }
  else {
    res.status(config.BAD_REQUEST).json({ message: "Invalid email" });
  }
});


//forgot password
router.post('/forgot_password', async (req, res) => {
  var schema = {
    'email': {
      notEmpty: true,
      errorMessage: "Email is required.",
      isEmail: { errorMessage: "Please enter valid email address" }
    }
  };
  req.checkBody(schema);
  var errors = req.validationErrors();

  if (!errors) {
    var hcp = await common_helper.findOne(HCP, { "email": req.body.email, "status": "active" }, 1)
    var patient = await common_helper.findOne(Patient, { "email": req.body.email, "status": "active" }, 1)
    if (patient.status === 0 && hcp.status === 0) {
      res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error while finding email" });
    } else if (patient.status === 2 && hcp.status === 2) {
      res.status(config.BAD_REQUEST).json({ "status": 0, "message": "No user available with given email" });
    } else if (patient.status === 1 || hcp.status === 1) {
      if (patient.status === 1) {
        if (patient.data.is_del == false) {
          if (patient.data.status == "active") {
            var reset_token = Buffer.from(jwt.sign({ "_id": patient.data._id }, config.ACCESS_TOKEN_SECRET_KEY, {
              expiresIn: 60 * 60 * 24 * 3
            })).toString('base64');
            var time = new Date();
            console.log('reset_token', reset_token);

            time.setMinutes(time.getMinutes() + 20);
            time = btoa(time);
            var up = {
              "flag": 0
            }
            var resp_data = await common_helper.update(Patient, { "_id": patient.data._id }, up);
            let mail_resp = await mail_helper.send("reset_password", {
              "to": patient.data.email,
              "subject": "Reset Password"
            }, {
                "user": "",
                "reset_link": "http://" + "/reset-password/" + reset_token
              });
            //"reset_link": "http://" + "/reset-password/" + reset_token + "/" + time
            if (mail_resp.status === 0) {
              res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
            } else {
              res.status(config.OK_STATUS).json({ "status": 1, "message": "Reset link has been sent on your email address " });
            }
          }
          else {
            res.status(config.BAD_REQUEST).json({ "status": 0, "message": "You havn't set your password yet" });
          }
        }
      }
      else if (hcp.status === 1) {
        if (hcp.data.is_del == false) {
          if (hcp.data.status == "active") {
            var reset_token = Buffer.from(jwt.sign({ "_id": hcp.data._id }, config.ACCESS_TOKEN_SECRET_KEY, {
              expiresIn: 60 * 60 * 24 * 3
            })).toString('base64');
            var time = new Date();
            console.log('reset_token', reset_token);

            time.setMinutes(time.getMinutes() + 20);
            time = btoa(time);
            var up = {
              "flag": 0
            }
            var resp_data = await common_helper.update(HCP, { "_id": hcp.data._id }, up);
            let mail_resp = await mail_helper.send("reset_password", {
              "to": hcp.data.email,
              "subject": "Reset password"
            }, {
                "user": "",
                "reset_link": "http://" + "/reset-password/" + reset_token
              });

            if (mail_resp.status === 0) {
              res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while sending mail", "error": mail_resp.error });
            } else {
              res.status(config.OK_STATUS).json({ "status": 1, "message": "Reset link has been sent on your email address " });
            }
          }

          else {
            res.status(config.BAD_REQUEST).json({ "status": 0, "message": "You havn't set your password yet" });
          }

        }
      }

      else {
        res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Your account is deactivated" });
      }
    }
  }
  else {
    res.status(config.BAD_REQUEST).json({ message: errors });
  }
});


// reset password
router.post('/reset_password', async (req, res) => {
  var schema = {
    'token': {
      notEmpty: true,
      errorMessage: "Reset password token is required."
    },
    'password': {
      notEmpty: true,
      errorMessage: "Password is required."
    }
  };
  var validat = passwordValidatorSchema
    .is().min(8)
    .symbols()	                                 // Minimum length 8
    .is().max(100)
    .letters()                                // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                       // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123'])
  req.checkBody(schema);
  var errors = req.validationErrors();
  if (!errors) {
    logger.trace("Verifying JWT");
    jwt.verify(Buffer.from(req.body.token, 'base64').toString(), config.ACCESS_TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (passwordValidatorSchema.validate(req.body.password) == true) {
          if (err.name === "TokenExpiredError") {
            logger.trace("Link has expired");
            res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Link has been expired" });
          } else {
            logger.trace("Invalid link");
            res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Invalid token sent" });
          }
        }
        else {
          res.json({ "message": "Please Enter password of atleast 8 characters including 1 Uppercase,1 Lowercase,1 digit,1 special character" })
        }
      } else {
        var reset_hcp = await common_helper.findOne(HCP, { "_id": decoded._id }, 1);
        var reset_patient = await common_helper.findOne(Patient, { "_id": decoded._id }, 1);
        if (reset_hcp.data && reset_hcp.status === 1) {
          if (reset_hcp.data.flag == 0) {
            if (decoded._id) {
              var update_resp = await common_helper.update(HCP, { "_id": decoded._id }, { "password": bcrypt.hashSync(req.body.password, saltRounds), "flag": 1 });
              if (update_resp.status === 0) {
                logger.trace("Error occured while updating : ", update_resp.error);
                res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while verifying user's email" });
              } else if (update_resp.status === 2) {
                logger.trace("not updated");
                res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Error occured while reseting password of user" });
              } else {
                logger.trace("Password has been changed - ", decoded._id);
                res.status(config.OK_STATUS).json({ "status": 1, "message": "Password has been changed" });
              }
            }
          }
          else {
            res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Link has expired" });
          }
        } else if (reset_patient.data && reset_patient.status === 1) {
          if (reset_patient.data.flag == 0) {
            if (decoded._id) {
              var update_resp = await common_helper.update(Patient, { "_id": decoded._id }, { "password": bcrypt.hashSync(req.body.password, saltRounds), "flag": 1 });
              if (update_resp.status === 0) {
                logger.trace("Error occured while updating : ", update_resp.error);
                res.status(config.INTERNAL_SERVER_ERROR).json({ "status": 0, "message": "Error occured while verifying user's email" });
              } else if (update_resp.status === 2) {
                logger.trace("not updated");
                res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Error occured while reseting password of user" });
              } else {
                logger.trace("Password has been changed - ", decoded._id);
                res.status(config.OK_STATUS).json({ "status": 1, "message": "Password has been changed" });
              }
            }
          }
          else {
            res.status(config.BAD_REQUEST).json({ "status": 0, "message": "Link has expired" });

          }
        }
      }
    });
  } else {
    res.status(config.BAD_REQUEST).json({ message: errors });
  }
});


module.exports = router;
