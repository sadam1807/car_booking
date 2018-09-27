var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');

var CarSchema = new mongoose.Schema({
  name:  {
    type: String,
    unique: true,
    required: [true, "Please provide Car name."],
    validate: [
      validate({
        validator: "isLength",
        arguments: [3, 50],
        message: "Name should be between  {ARGS[0]} and {ARGS[1]} characters."
      })
    ]
  },
  features: {
    type: String,
    required: [true, "Please Provide car image"]
  },
  thumbnailImage: {
    type: String,
    required: [true, "Please Provide Car Image."]
  },
  sliderImage: {
    type: String,
    required: [true, "Please Provide Slider Image."]
  },
  isSlider: {
    type: Boolean,
    default : false
  },
  isActive: {
    type: Boolean,
    default : true
  },
}, {
  timestamps: true
});

CarSchema.plugin(uniqueValidator, { message: 'This {PATH} already exists.' });
exports.Car = mongoose.model("Car", CarSchema);
