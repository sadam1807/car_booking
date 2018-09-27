var carModel = require("../models/cars");
var createError = require("http-errors");

module.exports = {
	addCar: addCar,
	getAllCars: getAllCars,
	getCarById: getCarById,
	updateCarById: updateCarById,
	deleteCarById: deleteCarById
};


function addCar(data, next) {
	var imgTypeExpression = /\.(gif|jpg|jpeg|tiff|png)$/i;
	if(!(imgTypeExpression).test(data.sliderImage)||!(imgType).test(data.thumbnailImage)){
		return next(createError(422, "Slider and Thumbnail image only supports image extensions"));
	 }
   carModel.Car.create(data)
   .then(function(result) {
	   return next(null, result, 201)
	   })
	   .catch(function(error) {
   return next(error, null, 422)
	   });
}

function getAllCars(req ,next) {
   getAll({},
	next);
}

function getCarById(carId, next) {
	var conditions = {_id: carId}
    getByValue({
	conditions: conditions
	},next);
}

function updateCarById(req, next) {
	var conditions = {_id: req.params.id}
	var updates = {name: req.body.name, features: req.body.features, thumbnailImage: req.body.thumbnailImage, 
		sliderImage: req.body.sliderImage, isSlider: req.body.isSlider, isActive: req.body.isActive }
	update({
        conditions: conditions,
		updates : updates
		},next);
}

function deleteCarById(carId, next) {
	var conditions = {_id: carId}
    deleteByValue({
	conditions: conditions
	},next);
}


//common funtions
function getAll(params, next){
    var conditions = params.conditions || {}
	carModel.Car.find(conditions)
	.then(function(result) {
		return next(null, result, 200);
	});
}

function getByValue(params, next) {
    carModel.Car.findOne(params.conditions)
    .then(function(result) {
      return next(null, result, 200);
    });
}

function update(params, next) {
    carModel.Car.findOneAndUpdate(params.conditions,params.updates)
    .then(function(result) {
      result.success="true";
      return next(null, result.success, 200);
    });
}

function deleteByValue(params, next) {
    carModel.Car.deleteOne(params.conditions)
    .then(function(result) {
        result.success="true";
      return next(null, result, 200);
    });
}