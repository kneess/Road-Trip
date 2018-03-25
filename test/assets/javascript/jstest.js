$(document).ready(function () {

    var hotelResults = []
    var hotResults = []
    var foodResults = []
    var fResults = []
    var attrResults = []
    var aResults = [];

    //HOTEL
    $(document).on("click", "#destinationCity", function (event) {
        event.preventDefault();
        var destination = $("#formGroupExampleInput").val().trim();
        console.log(destination);
        var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotel+in+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (hotelResponse) {
            var hResults = hotelResponse.results;
            console.log(hResults);
            for (var i = 0; i < 10; i++) {

                var placeId2 = hResults[i].place_id;
                var hotelName = hResults[i].name;
                var hotelObj = {
                    name: hotelName,
                    placeId: placeId2
                }

                hotelResults.push(hotelObj);
                console.log(hotelResults);
            };

            renderCardHead(hotelResults, "hotelResults");

            $(document).on("click", "#hotSurprise", function (event) {
                event.preventDefault();
                var random = hotelResults[Math.floor(Math.random() * hotelResults.length)];
                console.log(random);
                
            });

            $(document).on("click", ".btn", function (event) {
                var id2 = $(this).attr("data");
                console.log(this);
                console.log(id2);
                console.log(placeId2);
                event.preventDefault();
                var queryURL3 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id2 + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
                $.ajax({
                    url: queryURL3,
                    method: "GET"
                }).then(function (response3) {
                    var results3 = response3.result;
                    console.log(results3);
                    var detailsDiv2 = $("<div class='details2'>");
                    var hName = results3.name;
                    var hAddress = results3.formatted_address;
                    var hRating = results3.rating;
                    var photo2 = $("<img>");
                    var photoReference2 = results3.photos[0].photo_reference;
                    var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference2 + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
                    photo2.attr("src", url);
                    var hWebsite = results3.website;
                    var hPhone = results3.formatted_phone_number;

                    var hObj = {
                        name: hName,
                        address: hAddress,
                        contact: hPhone,
                        rating: hRating,
                        image: photo2,
                        Link: hWebsite
                    };
                    hotResults.push(hObj);
                    console.log(hotResults);
                    renderCardBody(hotResults, "hotResults");
                })

            });

        });
        //RESTAURANT

        var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.results;
            console.log(results);
            for (var i = 0; i < 10; i++) {
                var placeId = results[i].place_id;
                var restName = results[i].name;
                var restaurantObj = {
                    name: restName,
                    placeId: placeId
                }
                foodResults.push(restaurantObj);
            }
            console.log(foodResults);
            renderCardHead(foodResults, "foodResults");

            $(document).on("click", "#foodSurprise", function (event) {
                event.preventDefault();
                var random2 = foodResults[Math.floor(Math.random() * foodResults.length)];
                console.log(random2);
                
            });
        });

        var id = $(this).attr("data");
        console.log(id);
        event.preventDefault();
        var queryURL2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {
            var results2 = response2.result;
            console.log(results2);
            var rName = results2.name;
            var rAddress = results2.formatted_address;
            var rRating = results2.rating;
            var website = results2.website;
            var phone = results2.formatted_phone_number;
            var photo = $("<img>");
            var photoReference = results2.photos[0].photo_reference;
            var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
            photo.attr("src", url);
            var restObj = {
                name: rName,
                address: rAddress,
                contact: phone,
                rating: rRating,
                image: photo,
                Link: website
            };

            fResults.push(restObj);
            renderCardBody(fResults, "fResults");
        });

        //THINGS TO DO
        var queryURL4 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=things to do+in+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
        $.ajax({
            url: queryURL4,
            method: "GET"
        }).then(function (thingsResponse) {
            var tResults = thingsResponse.results;
            console.log(tResults);
            for (var i = 0; i < 10; i++) {
                var placeId3 = tResults[i].place_id;
                var thingsName = tResults[i].name;
                var thingsObj = {
                    name: thingsName,
                    placeId: placeId3
                }
                attrResults.push(thingsObj);
                console.log(attrResults);

            };
            renderCardHead(attrResults, "attrResults");

            $(document).on("click", "#attrSurprise", function (event) {
                event.preventDefault();
                var random3 = attrResults[Math.floor(Math.random() * attrResults.length)];
                console.log(random3);
                });
        });


        var id3 = $(this).attr("data");
        console.log(id3);
        event.preventDefault();
        var queryURL5 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id3 + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
        $.ajax({
            url: queryURL5,
            method: "GET"
        }).then(function (response5) {
            var results5 = response5.result;
            console.log(results5);
            var tName = results5.name;
            var tAddress = results5.formatted_address;
            var tRating = results5.rating;
            var photo3 = $("<img>");
            var photoReference3 = results5.photos[0].photo_reference;
            var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference3 + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
            photo3.attr("src", url);
            var tWebsite = results5.website;
            var tPhone = results5.formatted_phone_number;
            var attrObj = {
                name: tName,
                address: tAddress,
                contact: tphone,
                rating: tRating,
                image: photo3,
                Link: twebsite
            }
            aResults.push(attrObj);
            renderCardBody(aResults, "aResults");
        });


        });


        function renderCardHead(resultsArry, cardContainer) {
            for (var i = 0; i < resultsArry.length; i++) {
                var card = $("<div>").addClass("card");
                var cardHeader = ` 
                    <div class="card-header" id="heading-${cardContainer}-${i}">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data = ${resultsArry[i].placeId} data-toggle="collapse" data-target="#collapse-${cardContainer}-${i}" aria-expanded="true" aria-controls="collapse-${cardContainer}-${i}">
                          ${resultsArry[i].name}
                        </button>
                      </h5>
                    </div>
                  `
                var cardBody = `
                <div id="collapse-${cardContainer}-${i}" class="collapse" aria-labelledby="heading-${cardContainer}-${i}">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p><strong>Address:</strong> ${resultsArry[i].address}</p>
                        <p><strong>Contact:</strong> ${resultsArry[i].contact}</p>
                        <p><strong>Rating:</strong> ${resultsArry[i].rating}</p>
                       
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <img src="${resultsArry[i].image}">
                        <p>${resultsArry[i].description}</p>
                        <a href="${resultsArry[i].link}">Learn More</a>
                        </div>
                      </div>
                    </div>
                </div>
                `

                    $(card).append(cardHeader, cardBody)
                $("#" + cardContainer).append(card)
            }
        }

        function renderCardBody(resultsArry, cardContainer) {
            for (var i = 0; i < resultsArry.length; i++) {
                var card = $("<div>").addClass("card");
                var cardHeader = ` 
                    <div class="card-header" id="heading-${cardContainer}-${i}">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data = ${resultsArry[i].placeId} data-toggle="collapse" data-target="#collapse-${cardContainer}-${i}" aria-expanded="true" aria-controls="collapse-${cardContainer}-${i}">
                          ${resultsArry[i].name}
                        </button>
                      </h5>
                    </div>
                  `
                var cardBody2 = `
                <div id="collapse-${cardContainer}-${i}" class="collapse" aria-labelledby="heading-${cardContainer}-${i}">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p><strong>Address:</strong> ${resultsArry[i].address}</p>
                        <p><strong>Contact:</strong> ${resultsArry[i].contact}</p>
                        <p><strong>Rating:</strong> ${resultsArry[i].rating}</p>
                       
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <img src="${resultsArry[i].image}">
                        <p>${resultsArry[i].description}</p>
                        <a href="${resultsArry[i].link}">Learn More</a>
                        </div>
                      </div>
                    </div>
                </div>
                `
                $(card).replaceWith(cardHeader, cardBody2)
                // $("#" + cardContainer).append(card)
                // $(card).append(cardBody)
                // $("#" + cardContainer).append(cardHeader)
            }
        }


    });

// });
