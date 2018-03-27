  // when scripts runs animate the form to show
  $("#destinationForm").slideDown("slow");

  var currentCity;
  var userLocationInfo;

  // Kathy mentioned to her tutor that we eventually would like to add a mapping feature to our app.  She showed her how to use this api to grab the user's location information.
  // The tutor also showed us this faster way to make an ajax call.
  $.get("https://freegeoip.net/json/", function(res){
    userLocationInfo = res;
    //console.log("userLocationInfo:", userLocationInfo)
    currentCity = res.city
  }, "jsonp");

  // users selected location info 
  var destinationInfo = {};

  // location autofill – with drop down – gets a list of citiess.  We knew we would need this info in the future for our maps.  The tutor showed us how to get and store the information of the destination city.
  $(function (){
    $("#destinationInput").autocomplete({
      source: function (request, response) {
       $.getJSON(
        "https://secure.geobytes.com/AutoCompleteCity?key=196ab1ff41303d2bf39b84d121658e4c&callback=?&q="+request.term,
        function (data) {
          response(data)
        }
       );
      },
      minLength: 3,
      select: function (event, ui) {
        var selectedObj = ui.item;

        getCityDetails(selectedObj.value).done(function (data) {
          //console.log(data);
          destinationInfo.city = data.geobytescity;
          destinationInfo.fullValue = data.geobytesfqcn;
          destinationInfo.country = data.geobytescountry
          destinationInfo.countryCode = data.geobytesinternet
          destinationInfo.region = data.geobytesregion
          destinationInfo.stateCode = data.geobytescode 
          destinationInfo.latitude = data.geobyteslatitude
          destinationInfo.longitude = data.geobyteslongitude

          $("#destinationInput").val(data.geobytescity);
             
            return destinationInfo;
        });
        return false;
      },
      open: function () {
       $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
      },
      close: function () {
       $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
      }
     });
    $("#destinationInput").autocomplete("option", "delay", 100);
  });

  // location autofill – get location  info from selected location
  function getCityDetails(fqcn) {

    if (typeof fqcn == "undefined") fqcn = $("#f_elem_city").val();
    cityfqcn = fqcn;
   
    if (cityfqcn) {
      
       return $.getJSON(
          "https://secure.geobytes.com/GetCityDetails?key=196ab1ff41303d2bf39b84d121658e4c&callback=?&fqcn="+cityfqcn   
        );
    }
  }

  // starts the application, after a user inputs their destination all other functions are triggered – user clicks go
  $("#destinationCity").on("click", function(event){
    // stop page refresh
    event.preventDefault();

    //console.log(destinationInfo)
    // make sure the user selected a location from the drop down
    if( Object.keys(destinationInfo).length === 0 ) {
      //console.log("true");

      // show input error message
      $("#inputMsg").text("Select an option from the drop down once you begin typing");

    }
    else {
      // if the user did select a location from drop down do the below actions

      // just the city name
      var destination = $("#destinationInput").val().trim();
      destination = destination.toLowerCase();
      //console.log(destination);
      
      // api calls here
      // create seperate functions for each api call and call the functions here

      // get weather
      getCurrentWeather();
      getFutureWeather();

      // get hotel, food, and attractions from gAPI
      // pass in city name
      getHotels(destination);
      getFood(destination);
      getAttrations(destination);

      // add a loading giff with a timeout

      // animation for hiding and showing content on the page 
      $("#destinationForm").slideUp("slow"); // hides the form
      $("#section2").slideDown("slow"); // shows the results

      // display the chosen destination and the current location for the user 
      $("#selectedDestination").html("");
      $("#selectedDestination").html(currentCity + "<span class='prpl'> ↝ </span>" + "<span><strong>" + destination + "</strong></span>");
      $(".selectedDestination").text(destination);
    } 
  });

  // allows user to press enter instead of pressing button 
  $('#destinationInput').keypress(function(e){
    // remove input error message if its there
    $("#inputMsg").text("");
    if(e.which == 13){//Enter key pressed
      e.preventDefault();
        $('#destinationCity').click();//Trigger search button click event
    }
  });

  // get weather forecast for today
  function getCurrentWeather(){

    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${destinationInfo.city},${destinationInfo.countryCode}&units=imperial&appid=b92bd67b1bf224690009c4ed1fc0e080`, function(results){

        // console.log("weather now", results);
        //console.log("testttt", results.weather[0].main);

        $("#todayIcon1, #todayIcon").attr("src", "");
        $("#todayIcon1, #todayIcon").attr("src", `https://openweathermap.org/img/w/${results.weather[0].icon}.png`);
        var date = moment(new Date()).format("MM/DD/YYYY");
        $("#dayDate").text(date);

        var temp = results.main.temp.toString();
        temp = temp.split(".");
        $("#currentTemp").html("<span class='temp'>" + temp[0] + "&#8457;</span>");

        $("#today, #today1").text(results.weather[0].main);

        var hiTemp = results.main.temp_max.toString();
        hiTemp = hiTemp.split(".")
        $("#hiTempToday").html("<span class='up'>&uarr;</span>" + hiTemp[0] + "&#8457;");

        var lowTemp = results.main.temp_min.toString()
        lowTemp = lowTemp.split(".")
        $("#lowTempToday").html("<span class='down'>&darr;</span>" + lowTemp[0] + "&#8457;");
      })
  }

  // forcast for day 2 and 3
  function getFutureWeather(){
    $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${destinationInfo.city},${destinationInfo.countryCode}&units=imperial&appid=b92bd67b1bf224690009c4ed1fc0e080`, function(results){
        //console.log("weather", results.list)

       // every 8 results in the array is a day
       // we need 2 consecutive days forecast

        // create a counter to keep tack of result for each days
        var counter = 0;

        //[0-7] === 1 day – dayTwo
        var day2Weather = [];

        //[0-7] === 1 day – dayThree
        var day3Weather = [];

        for(var i = 0;i < 16; i++){
          if(counter < 8){
            // less than 8 means its still the second days results
            day2Weather.push(results.list[i]);
            counter++;
          }
          else{
            // anything above 8 and less than 16 is the third day results
            day3Weather.push(results.list[i]);
            counter++;
          }
        }

        // could all be put into a display Weatherresults function to make dry code

        /*////////////////Display DAY 2 Results ///////////////////////*/
        //console.log(day2Weather);
        var date2 = day2Weather[0].dt_txt;
        date2 = date2.split("-");
        var day2 = date2[2].split(" ");
        day2 = day2[0];
        //console.log(day1)

        // format day so it readable
        var newDate2 = date2[1]+"/"+day2+"/"+date2[0];
        $("#dayTwoDate").html(newDate2);

        $("#twoDayIcons").attr("src", "");
        $("#twoDayIcons").attr("src", `https://openweathermap.org/img/w/${day2Weather[0].weather[0].icon}.png`);

        $("#twoDescrip").text(day2Weather[0].weather[0].main);

        var temp1 = day2Weather[3].main.temp.toString();
        temp1 = temp1.split(".");
        $("#dayTwo").html("<span class='temp'>" + temp1[0] + "&#8457;</span>");

        var hiTemp1 = day2Weather[7].main.temp_max.toString();
        hiTemp1 = hiTemp1.split(".");
        $("#hiTempDayTwo").html("<span class='up'>&uarr;</span>" + hiTemp1[0] + "&#8457;");

        var lowTemp1 = day2Weather[0].main.temp_min.toString();
        lowTemp1 = lowTemp1.split(".");
        $("#lowTempDayTwo").html("<span class='down'>&darr;</span>" + lowTemp1[0] + "&#8457;");
        // $("#rainDayTwo")

        /*////////////////Display DAY 3 Results ////////////////////////*/
        // console.log(day3Weather)
        var date3 = day3Weather[0].dt_txt
        date3 = date3.split("-");
        //console.log(date3)
        var day3 = date3[2].split(" ");
        day3 = day3[0];
        //console.log(day2)

        // format day so it readable
        var newDate3 = date3[1]+"/"+day3+"/"+date3[0];
        $("#daythreeDate").html(newDate3);

        $("#ThreeDayIcons").attr("src", "");
        $("#ThreeDayIcons").attr("src", `https://openweathermap.org/img/w/${day3Weather[0].weather[0].icon}.png`);

        $("#threeDescrip").text(day3Weather[0].weather[0].main);

        var temp2 = day2Weather[3].main.temp.toString();
        temp2 = temp2.split(".");
        $("#dayThree").html("<span class='temp'>" + temp2[0] + "&#8457;</span>");

        var hiTemp2 = day2Weather[7].main.temp_max.toString();
        hiTemp2 = hiTemp2.split(".");
        $("#hiTempDayThree").html("<span class='up'>&uarr;</span>" + hiTemp2[0] + "&#8457;");

        var lowTemp2 = day2Weather[0].main.temp_min.toString();
        lowTemp2 = lowTemp2.split(".");
        $("#lowTempDayThree").html("<span class='down'>&darr;</span>" + lowTemp2[0] + "&#8457;");

      })
  }

  // hotel results
  var apiKey = "&key=AIzaSyCNDmPqZOjXBhXXOgsRpnFMEELte5ssmi4"
  function getHotels(destination){
    $("#loadingModal").modal("show");
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotel+in+" + destination + apiKey;
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + queryURL,
        method: "GET"
    }).then(function (hotelResponse) {
        var hResults = hotelResponse.results;
       // console.log(hotelResponse)

        for (var i = 0; i < 5; i++) {
          //console.log("inside hotel loop");

          var hotelObj = {
              name: null,
              placeId: null,
              address: null,
              contact: null,
              rating: null,
              description: null,
              image: null,
              link: null
          }

          hotelObj.placeId = hResults[i].place_id;
          hotelObj.name = hResults[i].name;

          getRemainingPlaceData(hotelObj, "hotelResults", i);
        };

       // console.log("hotel Object", hotelObj);
    });
  }

  // food results
  function getFood(destination){
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + destination + apiKey;
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + queryURL,
        method: "GET"
    }).then(function (foodResponse) {
      var fResults = foodResponse.results;
      //console.log(fResults)
      for (var i = 0; i < 5; i++) {
        // console.log("inside food loop");

        var foodObj = {
            name: null,
            placeId: null,
            address: null,
            contact: null,
            rating: null,
            description: null,
            image: null,
            link: null
        }

        foodObj.placeId = fResults[i].place_id;
        foodObj.name = fResults[i].name;
        getRemainingPlaceData(foodObj, "foodResults", i);
       
      }
    });
  }

  // attraction results 
  function getAttrations(destination){
    var queryURL4 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=things to do+in+" + destination + apiKey;
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + queryURL4,
        method: "GET"
    }).then(function (thingsResponse) {
      var tResults = thingsResponse.results;
      //console.log(tResults);
      for (var i = 0; i < 5; i++) {
      
        // console.log("inside things loop");

        var attrObj = {
            name: null,
            placeId: null,
            address: null,
            contact: null,
            rating: null,
            description: null,
            image: null,
            link: null
        }

        attrObj.placeId = tResults[i].place_id;
        attrObj.name = tResults[i].name;
        getRemainingPlaceData(attrObj, "attrResults", i);

      };
    });
  }

  function getRemainingPlaceData(placeObj, container, num) {
      var queryURL3 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeObj.placeId + apiKey;
      $.ajax({
          url: 'https://cors-anywhere.herokuapp.com/' + queryURL3,
          method: "GET"
      }).then(function (response3) {
          // object
          var results3 = response3.result;
          // console.log(results3);

          // update the object from the orginal function call
          placeObj.description = results3.reviews[0].text;
          placeObj.address = results3.formatted_address;
          placeObj.rating = results3.rating;
          var photoReference2 = results3.photos[0].photo_reference;
          placeObj.image = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoReference2 + "&sensor=false&maxheight=400&maxwidth=400" + apiKey;
          placeObj.link = results3.website;
          placeObj.contact = results3.formatted_phone_number;

          // render the data on the page
          renderResults(placeObj, container, num);

         
      });
  };
      
  // display api results in the accordions
  function renderResults(placeObj, cardContainer, num) {
    $("#finalTripSelection").empty().addClass("hide");
    $("#accordian-wrap").removeClass("hide");

    var card = $("<div>").addClass("card");
    card.attr("data-select", num);

    var cardHeader = ` 
                <div class="card-header" id="heading-${cardContainer}-${num}">
                  <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-${cardContainer}-${num}" aria-expanded="true" aria-controls="collapse-${cardContainer}-${num}">
                      ${placeObj.name} 
                    </button>
                  </h5>
                </div>
              `
    var cardBody = `
            <div id="collapse-${cardContainer}-${num}" class="collapse" aria-labelledby="heading-${cardContainer}-${num}">
                <div class="card-body">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <p><strong>Address:</strong> ${placeObj.address}</p>
                    <p><strong>Contact:</strong> ${placeObj.contact}</p>
                    <p><strong>Rating:</strong> ${placeObj.rating}</p>
                   
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hotel-img-wrapper">
                      <img class="hotel-img" src="${placeObj.image}">
                      <p>${placeObj.description}</p>
                      <a class="link" href="${placeObj.link}">Learn More</a>
                      <button class="btn btn-primary trip-option cardContainer" data-option="${cardContainer}-${num}">Select This Option</button>
                    </div>
                  </div>
                </div>
            </div>
            `
    $(card).append(cardHeader, cardBody);
    $("#" + cardContainer).append(card);
    
    // this some time takes logger than 10 seconds >_<
    setTimeout(function(){ $("#loadingModal").modal("hide"); }, 3000);
  };

  var userTripSelection = {};
  // reset application on click of start over button
  $("#startOver").on("click", function(){
    $("#finalTripSelection").empty()
    $("#finalTripSelection").addClass("hide")
    // set result variables to empty / null for each api call

    $("#today,#today1, #hiTempToday, #lowTempToday, #rainToday").empty()

    // reset accordions to empty
    $("#hotelResults, #foodResults, #attrResults").empty()

    // reset the destination value to ""
    $("#destinationInput").val("")
    // clear the got to text
    $("#selectedDestination").html("")
    //  clear the destination in the weather container
    $(".selectedDestination").text("")
    // hide section2 
    $("#section2").slideUp("slow"); // shows the results
    // show the form
    $("#destinationForm").slideDown("slow"); // hides the form 

    $("#finalTripSelection").addClass("hide").html("");
    $("#accordian-wrap, #finish").removeClass("hide"); 
    userTripSelection = {};

  });


  

  $(".surprise").on("click", function(){
    var surpriseBtn = $(this).attr("id");
    switch(surpriseBtn){
      case "surpriseAttr":
          // select a number 0-4
          userTripSelection.attraction = genRandomNum();
       break;
      case "surpriseFood":
          // select a number 0-4
          userTripSelection.food = genRandomNum();
        break;
      case "surpriseHotel":
          // select a number 0-4
          userTripSelection.hotel = genRandomNum();
      break;
    }
  });

  function genRandomNum(){
    return Math.floor((Math.random() * 4));
  }

  // get users selected choice for trip from each accordian  
  $(document).on("click", ".trip-option", function(){
    var selectedOption = $(this).attr("data-option")
    // console.log(selectedOption)
    var optionKey = selectedOption.split("-");
    // console.log("selected option key", optionKey[0]);
    // console.log("selected option value", optionKey[1]);

    //We learned how to use a switch statement so we could throw in different conditions!
    switch(optionKey[0]){
      case "hotelResults":
      userTripSelection.hotel = parseInt(optionKey[1]);
        break;
      case "foodResults":
      userTripSelection.food = parseInt(optionKey[1]);
        break;
      case "attrResults":
      userTripSelection.attraction = parseInt(optionKey[1]);
        break;
    }
  });


  // display the selected choices for the users trip
  $("#finish").on("click", function(){
   // console.log(userTripSelection);
   //If the user didn't choose an option, ths prompts them to make a selection.
    if( Object.keys(userTripSelection).length === 0 ) {
      $("#accordian-wrap, #finish").addClass("hide");
      $("#finalTripSelection").removeClass("hide").html("");
      $("#finalTripSelection").html("<h2 class='noSelection'>None of the options were selected</h2>");
      
    }
    else {
      $("#accordian-wrap, #finish").addClass("hide");
      $("#finalTripSelection").removeClass("hide").html("");
      
      //Settin variables to hold their selection
      // console.log(userTripSelection);
      var hotelChoice = userTripSelection.hotel;
      // console.log("hotelChoice", hotelChoice);

      var foodChoice  = userTripSelection.food;
      // console.log("foodChoice", foodChoice);

      var attrChoice  = userTripSelection.attraction;
      // console.log("attrChoice", attrChoice);

    if(!isNaN(hotelChoice)){
      var hotelName = $(`#heading-hotelResults-${hotelChoice}`).find(".btn-link").text().trim();
      var hotelLink = $(`#collapse-hotelResults-${hotelChoice}`).find(".link")[0].attributes.href.value;
      var hotelHtml = `
        <div class="panel panel-default">
          <div class="panel-body">
          <p>${hotelName}</p>
          <a href=${hotelLink}><button class="btn btn-primary">Learn More!</button></a>
          </div>
        </div>`;
    }else {
      var hotelHtml = `
        <div class="panel panel-default">
          <div class="panel-body">
          <p>No Hotel Option Selected</p>
        </div>`;
    }

    if(!isNaN(foodChoice)){
     var foodName = $(`#heading-foodResults-${foodChoice}`).find(".btn-link").text().trim();
     var foodLink = $(`#collapse-foodResults-${hotelChoice}`).find(".link")[0].attributes.href.value;
      var foodHtml = `
      <div class="panel panel-default">
        <div class="panel-body">
        <p>${foodName}</p>
        <a href=${foodLink}><button class="btn btn-primary">Learn More!</button></a>
        </div>
      </div>`;
    }
    else {
      var hotelHtml = `
        <div class="panel panel-default">
          <div class="panel-body">
          <p>No Food Option Selected</p>
        </div>`;
    }

    if(!isNaN(attrChoice)){
      var attrName = $(`#heading-attrResults-${attrChoice}`).find(".btn-link").text().trim();
      var attrLink = $(`#collapse-attrResults-${hotelChoice}`).find(".link")[0].attributes.href.value;
      var attrHtml = `
        <div class="panel panel-default">
          <div class="panel-body">
          <p>${attrName}</p>
          <a href=${attrLink}><button class="btn btn-primary">Learn More!</button></a>
          </div>
        </div>`;
    }
    else {
      var hotelHtml = `
        <div class="panel panel-default">
          <div class="panel-body">
          <p>No Attraction Selected</p>
        </div>`;
    }
     
      $("#finalTripSelection").append(hotelHtml, foodHtml, attrHtml);
    }
  });

 
    //console.log(userTripSelection)