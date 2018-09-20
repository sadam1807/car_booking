var bcrypt = require("bcryptjs");
var env = 'development'; //Make this dynamic to take care of production

var config = {
  production: {

  },
  development: {
    auth: {
      salt: bcrypt.genSaltSync(10),
      minLength: 8,
      secret: "This is the secret",
      expiresIn: 60*60*24*30 //1 month in seconds.
    }
  }
}

module.exports = config[env];
