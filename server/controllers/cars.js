var carDao = require("../dao/car");
var response = require("../lib/response");


module.exports = {
  addCar: addCar,
  getAllCars : getAllCars,
  getCarById : getCarById,
  updateCarById: updateCarById,
  deleteCarById: deleteCarById
}

function addCar(req, res) {
	carDao.addCar(req.body, function(error, data, statusCode) {
		response.sendResponse(res, error, data, statusCode);
	});
}

function getAllCars(req, res) {
	carDao.getAllCars(req.body, function(error, data, statusCode) {
		response.sendResponse(res, error, data, statusCode);
	});
}

function getCarById(req, res) {
	carDao.getCarById(req.params.id, function(error, data, statusCode) {
		response.sendResponse(res, error, data, statusCode);
	});
}

function updateCarById(req, res) {
	carDao.updateCarById(req, function(error, data, statusCode) {
		response.sendResponse(res, error, data, statusCode);
	});
}

function deleteCarById(req, res) {
	carDao.deleteCarById(req.params.id, function(error, data, statusCode) {
		response.sendResponse(res, error, data, statusCode);
	});
}
