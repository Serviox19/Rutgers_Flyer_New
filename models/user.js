var Sequelize = require('sequelize');
var connection = new Sequelize('rutgersflyers_db', 'root');
var bcrypt = require("bcryptjs");

var User = connection.define('User', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5,10],
        msg: "Your password must be between 5-10 characters"
      },
    }
  },
}, {
  hooks: {
    beforeCreate: function(input){
      input.password = bcrypt.hashSync(input.password, 10);
    }
  }
});

module.exports = User;
