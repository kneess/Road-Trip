$(document).ready(function () {

    var hotelResults = []
    var hResults = []
    var foodResults = []
    var fResults =[]
    var attrResults = []
    var aResults = [];

    $(document).on("click", "#destinationCity", function (event) {
        event.preventDefault();
        var destination = $("#formGroupExampleInput").val().trim();
        console.log(destination);
        var restArray = [];
        var hotelArray = [];
        var thingsToDoArray = [];
        var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotel+in+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (hotelResponse) {
            var hResults = hotelResponse.results;
            console.log(hResults);
            for (var i = 0; i < 10; i++) {
                var placeId2 = hResults[i].place_id;
                // var hotelDiv = $("<button class='hotel'>");
                // hotelDiv.attr("data", placeId2);
                var hotelName = hResults[i].name;
                // var hotelAddress = hResults[i].formatted_address;
                // var hotelRating = hResults[i].rating;
                // var hp = $("<p>").text(hotelName);
                // var hp3 = $("<p>").text(hotelRating);
                // var hp4 = $("<p>").text(hotelAddress);
                // hotelDiv.prepend(hp4);
                // hotelDiv.prepend(hp3);
                // hotelDiv.prepend(hp);
                // $("#hotelResults").prepend(hotelDiv);
                var hotelObj = {
                    name: hotelName,
                    placeId: placeId2
                }
                hotelResults.push(hotelObj);
                console.log(hotelResults);
            };
          

            $(document).on("click", ".btn btn-link collapsed optionsBtn", function (event) {
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
                    var hHours = results3.opening_hours.weekday_text;
                    var hWebsite = results3.website;
                    var hPhone = results3.formatted_phone_number;
                    $("#hotelResults").hide();
                    var hp7 = $("<p>").text("Name: " + hName);
                    var hp8 = $("<p>").text("Rating: " + hRating);
                    var hp9 = $("<p>").text("Address: " + hAddress);
                    var hp5 = $("<p>").text("Hours: " + hHours);
                    var hp6 = $("<p>").text("Phone Number: " + hPhone);
                    // var p = $("<a>").text(website);
                    var hp2 = $("<a>").text(hName);
                    hp2.attr("href", hWebsite)
                    detailsDiv2.prepend(hp5);
                    detailsDiv2.prepend(hp8);
                    detailsDiv2.prepend(hp6);
                    detailsDiv2.prepend(hp9);
                    detailsDiv2.prepend(photo2);
                    detailsDiv2.prepend(hp2);

                    var hObj = {
                        name: hName,
                        address: hAddress,
                        contact: hphone,
                        rating: hRating,
                        image: photo2,
                        Link: hwebsite
                    };               
                })
                hResults.push(hObj);
            });
            
        });
                //RESTAURANT
               
                    // var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
                    // $.ajax({
                    //     url: queryURL,
                    //     method: "GET"
                    // }).then(function (response) {
                    //     var results = response.results;
                    //     console.log(results);
                    //     for (var i = 0; i < 10; i++) {
                    //         var placeId = results[i].place_id;
                    //         var restDiv = $("<button class='item'>");
                    //         restDiv.attr("data", placeId);
                    //         var restName = results[i].name;
                    //         var restAddress = results[i].formatted_address;
                    //         var rating = results[i].rating;
                    //         var p = $("<p>").text("Name: " + restName);
                    //         var p3 = $("<p>").text("Rating: " + rating);
                    //         var p4 = $("<p>").text("Address: " + restAddress);
                    //         p.addClass("p");
                    //         restDiv.prepend(p3);
                    //         restDiv.prepend(p4);
                    //         restDiv.prepend(p);

                    //         var restaurantObj = {
                    //             name: restName,
                    //             placeId: placeId
                    //         }
                       
                    //     }
                    //     foodResults.push(restaurantObj);
                        // var id = $(this).attr("data");
                        // console.log(id);
                        // event.preventDefault();
                        // var queryURL2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
                        // $.ajax({
                        //     url: queryURL2,
                        //     method: "GET"
                        // }).then(function (response2) {
                        //     var results2 = response2.result;
                        //     console.log(results2);
                        //     var detailsDiv = $("<div class='details'>");
                        //     var rName = results2.name;
                        //     var rAddress = results2.formatted_address;
                        //     var rRating = results2.rating;
                        //     var hours = results2.opening_hours.weekday_text;
                        //     var website = results2.website;
                        //     var phone = results2.formatted_phone_number;
                        //     var photo = $("<img>");
                        //     var photoReference = results2.photos[0].photo_reference;
                        //     var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
                        //     $("#results").hide();
                        //     photo.attr("src", url);
                        //     var p7 = $("<p>").text("Name: " + rName);
                        //     var p8 = $("<p>").text("Rating: " + rRating);
                        //     var p9 = $("<p>").text("Address: " + rAddress);
                        //     var p5 = $("<p>").text("Hours: " + hours);
                        //     var p6 = $("<p>").text("Phone Number: " + phone);
                        //     // var p = $("<a>").text(website);
                        //     var p2 = $("<a>").text(rName);
                        //     p2.attr("href", website)
                        //     detailsDiv.prepend(p5);
                        //     detailsDiv.prepend(p8);
                        //     detailsDiv.prepend(p6);
                        //     detailsDiv.prepend(p9);
                        //     detailsDiv.prepend(photo);
                        //     detailsDiv.prepend(p2);
                        //     // $("#specs").prepend(detailsDiv);

                        //     var restaurantObj = {
                        //         name: rName,
                        //         address: rAddress,
                        //         contact: phone,
                        //         rating: rRating,
                        //         image: photo,
                        //         Link: website
                        //     };

                        //     fResults.push(restaurantObj);
                        // });

                    });

                    // pass in results array and string that is the name of the html element we are appending to
                    renderResults(hotelResults, "hotelResults");
                    renderResults(hResults, "hResults");
                    // pass in results array and string that is the name of the html element we are appending to
                    renderResults(foodResults, "foodResults");
                    renderResults(fResults, "fResults");
                    // pass in results array and string that is the name of the html element we are appending to
                    renderResults(attrResults, "attrResults");
                    renderResults(aResults, "aResults");

                    function renderResults(resultsArry, cardContainer) {
                        for (var i = 0; i < resultsArry.length; i++) {
                            var card = $("<div>").addClass("card");
                            var cardHeader = ` 
                    <div class="card-header" id="heading-${cardContainer}-${i}">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-${cardContainer}-${i}" aria-expanded="true" aria-controls="collapse-${cardContainer}-${i}">
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


                });
            
        // });
   
// });