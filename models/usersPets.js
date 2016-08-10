'use strict'; //for this join file must use camelcase

module.exports = function(sequelize, DataTypes) {
  var usersPets = sequelize.define('usersPets', {
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    swipe_direction: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations are defined here
        m.users.hasMany(m.pets, {through: 'usersPets'});
        m.pets.hasMany(m.users, {through: 'usersPets'});
        
      }
    }
  });
  return usersPets;
};