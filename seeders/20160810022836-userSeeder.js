'use strict';
var http = require('http');
var async = require('async');

module.exports = {
  
  up: function (queryInterface, Sequelize) {
    var deffered = Sequelize.Promise.defer();
    
    // console.log(queryInte);
    // console.log("*************")
    // console.log(promise);
   
    var pets = [];
            var queryURL = "http://api.petfinder.com/shelter.getPets?key=00d01e3820b591286ac4ffee090945b5&id=TX514&format=json&output=full";

            //Making a call to the api
            // make promise 

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
                        debugger;
                    } catch (error) {
                        // throw error;
                        debugger;
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
                              description: parsedJson.petfinder.pets.pet[i].description.$t
                              img_url: for (parsedJson[i].petfinder.pet[i].media.photos.photo[3].$t,
                              createdAt: new Date(),
                              updatedAt: new Date()
                              
                          } 
                          //console.log(uniquePet);
                          pets.push(uniquePet);
                          //call promise
                      } else {
                              return;
                              //console.log('Doesnt work');
                              promise.reject();
                      } 

                    }
                    var queryInt = queryInterface.bulkInsert('pets', pets, {});

                    deffered.resolve(queryInt);


                });
            });

            //console.log(promise);
            return deffered.promise;
        
    //     /*formatted_api_data*/
    //     //var pets = [];


    //     // This loop is set up so that we can make a call to the api to grab ALL THE PETS!!!
    //     var targetUrls = [];
    //     for (var i = 34800000; i < 34800010; i++) {

    //         targetUrls.push("http://api.petfinder.com/pet.get?key=00d01e3820b591286ac4ffee090945b5&id=" + i + "&format=json&output=basic");
    //       }
    //       async.method.targetUrls
    //         //Making a call to the api
    //         http.get(queryURL, function(data){
    //             var json = '';
    //             data.setEncoding('utf8');

    //             // Storing the data in the empty variable.
    //             data.on("data", function(chunk) {
    //                 if (typeof chunk === 'string') {
    //                     json += chunk;
    //                 }
    //             });

    //             // Listener, waiting for the data to send completely 
    //             data.on("end", function(resdata) {

    //                 // Parsing the json variable and storing it in another variable
    //                 try {
    //                     var parsedJson = JSON.parse(json);
    //                 } catch (error) {
    //                     debugger;
    //                 }

    //                 // Declaring a variable to weed out the responses that don't have any relevant data
    //                 var statusCode = parsedJson.petfinder.header.status.code.$t;
    //                 console.log("STATUS CODE: " + statusCode);
    //                 // debugger;
    //                 //console.log(parsedJson);

    //                 // Only creating an object where the status code == 100
    //                 if (statusCode == "100") {
    //                     var uniquePet = {
    //                         id: parsedJson.petfinder.pet.id.$t,
    //                         name: parsedJson.petfinder.pet.name.$t,
    //                         type: parsedJson.petfinder.pet.animal.$t,
    //                         breed: parsedJson.petfinder.pet.breeds.breed.$t,
    //                         description: parsedJson.petfinder.pet.description.$t
    //                         //img_url: for (parsedJson[i].petfinder.pet.media.photos.photo[i]
    //                     } 
    //                     //console.log("ID: " + i)
    //                     console.log(uniquePet);
    //                     pets.push(uniquePet);
    //                     return queryInterface.bulkInsert('pets', uniquePet, {});
    //                 } else {
    //                         return;
    //                         console.log("Doesn't work")
    //                 }   
    //             });
    //         });
    //     }
    // //}
    
      //Example:
   
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('pets', null, {});
    
  }
};
