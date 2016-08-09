var key = '9b4604790e9c66428f6c9d46cbd08977';

function findRandomDog() {
    var queryURL = 'http://localhost:5000/petFinder';

    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
        });
}

findRandomDog();