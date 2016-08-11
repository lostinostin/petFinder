'use strict'; //for this join file must use camelcase

module.exports = function(sequelize, DataTypes) {
  var usersPets = sequelize.define('usersPets', {
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    swipe_direction: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(m) {
        // associations are defined here
        m.users.belongsToMany(m.pets, {through: 'usersPets'});
        m.pets.belongsToMany(m.users, {through: 'usersPets'});
        
      }
    }
  });
  return usersPets;
};