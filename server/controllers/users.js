var userDao = require("../dao/user");
var response = require("../lib/response");


module.exports = {
  register: register,
  login: login
}

function register(req, res) {
	userDao.createUser(req.body, function(error, data, statusCode) {
		response.sendResponse(res, error, data, statusCode);
	});
}

function login(req, res) {
	userDao.login(req.body, function(error, data, statusCode) {
		response.sendResponse(res, error, data, statusCode);
	});
}
