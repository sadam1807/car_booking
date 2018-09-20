var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: [true, "Please provide your name."],
    validate: [
      validate({
        validator: "isLength",
        arguments: [3, 50],
        message: "Name should be between  {ARGS[0]} and {ARGS[1]} characters."
      })
    ]
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: [true, "An email is required"],
    validate: [
      validate({
        validator: "isEmail",
        message: "Please enter a valid email"
      })
    ]
  },
  hashedPassword: {
    type: String,
    default: ""
  },
  userType: {
    type: String,
    enum: ["admin", "customer"],
    required: [true, "User Type field is required"]
  },
  created: { 
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

UserSchema.plugin(uniqueValidator, { message: 'This {PATH} already exists.' });
exports.User = mongoose.model("User", UserSchema);
