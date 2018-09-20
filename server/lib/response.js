var createError = require("http-errors");

module.exports = {
	sendResponse:sendResponse
}

function sendResponse(res, error, data, code) {
	if(error) {
		var errorMessage = error.message;
        var errorName = error.name;
        var statusCode = error.status || code || 422;
        return res.status(statusCode).json({message: errorMessage, error: errorName});
	}
	return res.status(code).json(data);
}
