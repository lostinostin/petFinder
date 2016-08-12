'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING(40)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //User.hasMany(models.Pets);
      }
    }
  });
  return User;
};