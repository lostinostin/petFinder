'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   
    var http = require('http');
    var json = [];
    var petsObject = [];
    http.get('http://api.petfinder.com/pet.get?key=9b4604790e9c66428f6c9d46cbd08977&id=34800000&format=json&output=basic', function(data){
        data.setEncoding('utf8');
        data.on("data", function(chunk) {
            json += chunk;
            console.log(chunk);
        });

        data.on("end", function(resdata) {
            var json = JSON.parse(emptyVar);
            // debugger;
            console.log(json);

        });
    });
    });



  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

