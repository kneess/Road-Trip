$(document).ready(function () {

    // key = AIzaSyD4-dwHSX-4r0QIU2pow3LIvMiUrF9O3nk
    var hotelResults = []
    var attrResults = []
    //HOTEL
    $(doc    $(document).on("click", "#destinationCity", function (event) {
        event.preventDefault();
        var destination = $("#formGroupExampleInput").val().trim();
        // console.log("destination" + destination);
        var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotel+in+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
        var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotel+in+" + destination + "&key=AIzaSyCx8gqMHIV2OLrVEa-9o5xU34SzJD6W3Js";
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/' + queryURL,
            method: "GET"
        }).then(function (hotelResponse) {
            var hResults = hotelResponse.results;
            console.log(hResults);
  for (var i = 0; i  i++) {
                console.log("created for loop");

               var hotelObj == {
                    rating: null,
             link: null
                }
                hotelObj.placeId = hResults[i].place_id;
        hotelObj.name = hResults[i].name;
        getRemainingPlaceData(hotelObj, num);
        num++;
        (hotelObj.name);       
    console.log("hotel Object", hotelObj);
        });
ults", 10);
    

    

    function getRemainingPlaceData(hotelObj, num) {
        var queryURL3 = "https://maps.googleapis.com/maps/ap    function getRemainingPlaceData(hotelObj, num) {
        var queryURL3 = "https://    function getRemainingPlaceData(hotelObj, num) {
        var queryURL3 = "https://mapuncgetRenction getRection g geiningPlaceData(hotelObj, num) {
        var 3 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + hotelObj.placeId + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
            anywhere.herokuapp.com/' + queryURL3,
              }).tnse3) {
            lts3 = response3.result;
            le.log(results3);
            .description = results3.reviews[0].text;
            s = results3.formatted_address;
            .rating = results3.rating;
            >");
            2 = results3.photos[0].photo_reference;
            // var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference2 + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";

    };

    //RNT

     //       // var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + destination + "&key=AIzaSyCx8gqMHIV2OLrVEa-9o5xU34SzJD6W3Js";
    $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/' + queryURL,
    method: "GET"
    }).tfunction (response) {
        results = response.results;
    // console.log(results);
        num = 0
        (var i = 0; i < 2; i++) {
        var restObj = {
                              
            l,
            escription: null,
            image: null,
            Link: null
        }
                      restObj.p        restObj.name = results[i].name;
getRemainingPlaceData(restObj, num);
    oodResults.push(restaurantObj);
     log("restaurant Object", restObj);

$(document$(documentvar queryURL2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + resbj.placeId + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEEL
// var queryURL2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + restObj.placeId + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELqueryURL2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + rest// var queryURL2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + restObueryURL2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + restObj.placeId + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
funcRemainingPlaceData(restObj, num){
var 2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + restObj.placeId + "&key=AIzaSyCx8gqMHIV2OLrVEa-9o5xU34SzJD6W3Js";

    tps://cors-anywhere.herokuapp.com/' + queryURL2,
    "GET"
}).tponse2) {
    nse2.result;
    lts2);
    lts2.name;
    esults2.formatted_address;
    results2.rating;
    link = results2.website;
    description = results2.reviews[0].text;
    contact = results2.formatted_phone_number;
    <img>");
photoReference = results2.photos[0].photo_reference;
    rl = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
lts(restObj, "foodResults", num);
    num++;
})
} );
//   //THINGS TO   //THINGS TONGS TO  queryURL4 = "//     // var queryURL4 = "/ ar queryURL4 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=things to do+in+" + destination + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
//     var queryURL4 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=things to do+in+" + destination + "&key=AIzaSyCx8gqMHIV2OLrVEa-9o5xU34SzJD6W3Js";
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
//        };
       renderCardHead(attrResults, "attrResults");

       $(document).on("click", "#attrSurprise", function (event) {
           event.preventDefault();
//             var random3 = attrResults[Math.floor(Math.random() * attrResults.length)];
           console.log(random3);
       });
   });

//    var //     var id3    var id3 = $(this).attr("data");
//     console.log(id3);
//     event.preventDefault();
   // var queryURL5 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id3 + "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
   var queryURL5 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id3 + "&key=AIzaSyCx8gqMHIV2OLrVEa-9o5xU34SzJD6W3Js";
   $.ajax({
       url: queryURL5,
       method: "GET"
   }).then(function (response5) {
       var results5 = response5.result;
       console.log(results5);
       var tName = results5.name;
       var tAddress = results5.formatted_address;
       var tRating = results5.rating;
       var tReview = results5.reviews[0].text;
       var photo3 = $("<img>");
       var photoReference3 = results5.photos[0].photo_reference;
       // var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference3 + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
       var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference3 + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCx8gqMHIV2OLrVEa-9o5xU34SzJD6W3Js";
       photo3.attr("src", url);
       console.log("photo3" + photo3);
       var tWebsite = results5.website;
       var tPhone = results5.formatted_phone_number;
       var attrObj = {
           name: tName,
           address: tAddress,
           contact: tphone,
           rating: tRating,
           description: tReview,
           image: photo3,
           Link: twebsite
       }
       aResults.push(attrObj);
       renderCardBody(aResults, "aResults");
   });

//// );
function renderResults(results, cardContainer, num) {
    $("finalTripSlection").empty();
inalTripSlection").addClass("hide")
    $("accordian-wrap").removeClass("hide")

    card = $("<div>").addCla
    cardr("data-select", num)
    var carder = ` 
                <div class="card-header" id="heading-${cardContainer}-${num}">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-${cardContainer}-${num}" aria-expanded="true" aria-controls="collapse-${cardContainer}-${num}">
                          ${results.name} 
                        </button>
                          </button>
                             </button>
                           </h5>
                    </div>
                  `
    var cardBody = `
            <div id="collase-${cardContainer}-${num}" class="collapse" aria-labelledby="heading-${cardContainer}-${num}">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p><strong>Address:</strong> ${results.address}</p>
                        <p><strong>Contact:</strong> ${results.contact}</p>
                        <p><strong>Rating:</strong> ${results.rating}</p>
                       
                        </div>
 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hotel-img-wrapper">
                          <img class="hotel-img" src="${results.image}">
                          <p>${results.description}</p>
                          <a href="${results.link}">Learn More</a>
                          <button class="btn btn-primary trip-option cardContainer" data-option="${cardContainer}-${num}">Select This Option</button>
                        </div>
                      </div>
                    </div>
                </div>
                `
    $(card).append(cardHeader, cardBody)
    $("#" + cardContainer).append(card)

};


}); 
 
}); 
    // fu
}); 
  ; 
    //; 
  
    /  unction renderCardHead(results, cardContainer) {
    //  or (var i = 0; i < resultsArry.length; i++) {
    //  ar card = $("<div>").addClass("card");
    //  ar cardHeader = ` 
    //                 <div class="card-header" id="heading-${cardContainer}-${i}">
    //                   <h5 class="mb-0">
    //                     <button class="btn btn-link collapsed" data = ${resultsArry.placeId} data-toggle="collapse" data-target="#collapse-${cardContainer}-${i}" aria-expanded="true" aria-controls="collapse-${cardContainer}-${i}">
    //                       ${resultsArry.name}
    //                     </button>
    //                   </h5>
    //                 </div>
    //               `
    //  ar cardBody =
    //             `
    //             <div id="collapse-${cardContainer}-${i}" class="collapse" aria-labelledby="heading-${cardContainer}-${i}">
    //                 <div class="card-body">
    //                   <div class="row">
    //                     <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    //                     <p><strong>Address:</strong> ${resultsArry.address}</p>
    //                     <p><strong>Contact:</strong> ${resultsArry.contact}</p>
    <p><strong>Rating:</strong> ${resultsArry.rating}</p>

    //                     </div>
    //                     <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    //                     <img src="${resultsArry.image}">
    //                     <p>${resultsArry.description}</p>
    //                     <a href="${resultsArry.link}">Learn More</a>
    //                     </div>
    //                   </div>
    //                 </div>
    //             </div>
    //     `

    // //         //  (card).append(cardHeader, cardBody)
    //  ("#" + cardContainer).append(card)
    
    

    // function renderCardBody(resultsArry, cardContainer) {
    // for (var i = 0; i < resultsArry.length; i++) {
    //     var card = $("<div>").addClass("card");
 //     var cardHeader = ` 
