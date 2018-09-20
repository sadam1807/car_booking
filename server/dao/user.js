var userModel = require("../models/user");
var bcrypt = require('bcryptjs');
var createError = require("http-errors");
var config = require("../settings/config");
var jwt = require("jsonwebtoken");

module.exports = {
    createUser: createUser,
    login: login
};


function createUser(data, next) {
	if(!data.password || data.password.length < config.auth.minLength) {
			return next(createError(422, "Your password should be made of at least " + config.auth.minLength + " characters."));
	}
	var hashedPassword = bcrypt.hashSync(data.password, config.auth.salt);
	data.hashedPassword = hashedPassword;
    userModel.User.create(data)
		.then(function(result) {
        result = result.toObject();
        delete result.hashedPassword;
		    return next(null, result, 201)
			})
			.catch(function(error) {
        return next(error, null, 422)
			});
}

function getUserByEmail(email, callback) {
  userModel.User.findOne({email: email}, function(error, user) {
    callback(error, user);
  });
}

function login(data, next) {
  getUserByEmail(data.email, function(error, user) {
    var authObject = {
      auth: false,
      token: null,
      message: "Email or password is incorrect"
    };
    if(error) {
      return next(error, null, 500);
    }
    if(!user) {
      return next(null, authObject, 401);
    }
    if(user) {
      var isPasswordValid = bcrypt.compareSync(data.password, user.hashedPassword);
      if(!isPasswordValid) {
        return next(null, authObject, 401);
      }
      var token = jwt.sign({id: user._id, userType: user.userType}, config.auth.secret, {expiresIn: config.auth.expiresIn});
      authObject.auth = true;
      authObject.token = token;
      authObject.userType = user.userType;
      authObject.message = "Successfuly logged in."
      return next(null, authObject, 200);
    }
  });
}