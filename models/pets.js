'use strict';
module.exports = function(sequelize, DataTypes) {
  var pets = sequelize.define('pets', {
    type: DataTypes.STRING,
    breed: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    img_url: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return pets;
};
