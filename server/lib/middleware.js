var response = require("../lib/response");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var config = require("../settings/config");
var _ = require("underscore");

module.exports = {
  verifyToken: verifyToken,
  checkUserRole: checkUserRole
};

function verifyToken(req, res, next) {
  /*
    Skip token verification from APP for register.
  */
  if
    (
      (req.originalUrl === '/api/v1/users/register' && req.body.userType === "patient") ||
      (req.originalUrl === '/api/v1/users/register' && req.body.userType == null) //Default userType is patient, so may not be passed
    )
  {
    return next();
  }
  else {
    /*
      Verify token for hospitals, patients created from admin panel.
    */
    var error = {
      message: 'Access token is missing.',
      name: 'Missing Token'
    }
    var statusCode = 403;
    var bearerToken = req.headers['authorization'];
    if(typeof bearerToken === 'undefined') {
      return response.sendResponse(res, error, null, statusCode);
    }
    var token = bearerToken.split(' ')[1];
    if(!token) {
      return response.sendResponse(res, error, null, statusCode);
    }
    jwt.verify(token, config.auth.secret, function(err, decoded) {
      if (err) {
        return response.sendResponse(res, err, null, statusCode);
      }
      req.user = decoded;
    });
    return next();
  }
};


function checkUserRole(roles) {
  var error = {
    message: "You are not allowed to perform this action",
    name: "Unauthorized"
  };
  var statusCode = 401;
  return function(req, res, next) {
    if(!_.contains(roles, req.user.userType)) {
      return response.sendResponse(res, error, null, statusCode);
    }
    return next();
  }
}
