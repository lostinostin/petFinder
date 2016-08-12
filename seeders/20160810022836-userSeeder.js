'use strict';
var http = require('http');
var async = require('async');

module.exports = {
  
  up: function (queryInterface, Sequelize) {
    var deferred = Sequelize.Promise.defer();
   
    var pets = [];
    var queryURL = "http://api.petfinder.com/shelter.getPets?key=00d01e3820b591286ac4ffee090945b5&id=TX514&format=json&output=full";
    console.log("***");
    http.get(queryURL, function(data){
        var json = '';
        data.setEncoding('utf8');

        // Storing the data in the empty variable.
        data.on("data", function(chunk) {
            if (typeof chunk === 'string') {
                json += chunk;
                console.log(chunk);
            }
        });

        // Listener, waiting for the data to send completely 
        data.on("end", function(resdata) {

            // Parsing the json variable and storing it in another variable
            try {
                var parsedJson = JSON.parse(json);
                // debugger;
            } catch (error) {
                throw error;
                // debugger;
            }

            // Declaring a variable to weed out the responses that don't have any relevant data
            var statusCode = parsedJson.petfinder.header.status.code.$t;
            console.log("STATUS CODE: " + statusCode);
            // debugger;
            //console.log(parsedJson);
            var petArr = parsedJson.petfinder.pets.pet;
            for (var i = 1; i < petArr.length; i++) {
              // Only creating an object where the status code == 100
              if (statusCode == "100") {
                  var uniquePet = {
                      id: parsedJson.petfinder.pets.pet[i].id.$t,
                      name: parsedJson.petfinder.pets.pet[i].name.$t,
                      type: parsedJson.petfinder.pets.pet[i].animal.$t,
                      breed: parsedJson.petfinder.pets.pet[i].breeds.breed.$t,
                      description: parsedJson.petfinder.pets.pet[i].description.$t,
                      createdAt: new Date(),
                      updatedAt: new Date()
                      
                  } 

                  if (parsedJson.petfinder.pets.pet[i].media.photos){
                    uniquePet.img_url = parsedJson.petfinder.pets.pet[i].media.photos.photo[2].$t;
                  };
                  //console.log(uniquePet);
                  pets.push(uniquePet);
                  
              } else {
                      return;
                      
                      promise.reject();

              } 

            }

            var queryInt = queryInterface.bulkInsert('pets', pets, {});
            deferred.resolve(queryInt);


        });
    });

            
            return deferred.promise;
   
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('pets', null, {});
    
  }
};
