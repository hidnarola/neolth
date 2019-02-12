var config = require('../config');

module.exports = function (req, res, next) {
    // console.log('req.decoded.role', req.decoded.role);

    if (req.decoded.role == "hcp" && req.baseUrl.match('/hcp')) {
        req.userInfo = req.decoded;
        next();
    }
    else if (req.decoded.role == "patient" && req.baseUrl.match('/patient')) {
        req.userInfo = req.decoded;
        next();
    }
    else if (req.decoded.role == "admin" && req.baseUrl.match('/admin')) {
        req.userInfo = req.decoded;
        next();
    } else if (req.decoded.role == "both") {
        req.userInfo = req.decoded;
        next();
    } else {
        return res.status(config.UNAUTHORIZED).json({
            "message": 'Unauthorized access'
        });
    }
}