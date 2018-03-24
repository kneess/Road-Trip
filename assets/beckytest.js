$(document).on("click", "#destinationCity", function (event) {
    event.preventDefault();
    var destination = $("#formGroupExampleInput").val().trim();
    console.log(destination);
    var restArray = [];
    var hotelArray = [];
    var thingsToDoArray = [];
    //Things to do:
    $(document).on("click", ".item", function (event) {
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
            var detailsDiv = $("<div class='details'>");
            var rName = results2.name;
            var rAddress = results2.formatted_address;
            var rRating = results2.rating;
            var hours = results2.opening_hours.weekday_text;
            var website = results2.website;
            var phone = results2.formatted_phone_number;
            var photo = $("<img>");
            var photoReference = results2.photos[0].photo_reference;
            var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference + "&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4";
            $("#results").hide();
            photo.attr("src", url);
            var p7 = $("<p>").text("Name: " + rName);
            var p8 = $("<p>").text("Rating: " + rRating);
            var p9 = $("<p>").text("Address: " + rAddress);
            var p5 = $("<p>").text("Hours: " + hours);
            var p6 = $("<p>").text("Phone Number: " + phone);
            // var p = $("<a>").text(website);
            var p2 = $("<a>").text(rName);
            p2.attr("href", website)
            detailsDiv.prepend(p5);
            detailsDiv.prepend(p8);
            detailsDiv.prepend(p6);
            detailsDiv.prepend(p9);
            detailsDiv.prepend(photo);
            detailsDiv.prepend(p2);
            // $("#specs").prepend(detailsDiv);

            var restaurantObj = {
                Name: rName,
                address: rAddress,
                Contact: phone,
                rating: rRating,
                image: photo,
                hotelLink: website
            };

            hotelResults.push(restaurantObj);
        })
    });
});
