
    // Event listener function to run destination weather 
$("#destinationCity").on("click", function(){
    event.preventDefault();
  
  var state = $()
  var cityWeather = $("#formGroupExampleInput").val().trim();
  
    console.log(cityWeather) 
  
    var APIKey = "e163cf3181413e43";
  
     // Here we are building the URL we need to query the database
     var queryURL = "http://api.wunderground.com/api/" + APIKey + "/forecast/conditions/q/" + state + "/" + cityWeather + ".json";
  
     // Here we run our AJAX call to the OpenWeatherMap API
     $.ajax({
      url: queryURL,
      method: "GET"
    })
  .then(function(response) {
  
      // Log the queryURL
      console.log(queryURL);
  
      // Log the resulting object
      console.log(response);
  
      //Todays Current Temp ------------------>
      $("#currentTemp").text("Current Temp: " + response.current_observation.temp_f + " F ");
      console.log("F" + response.current_observation.temp_f)
     
      //Todays Forecast ----------------->
      var imageToday = $("<img>");
     imageToday.attr("src", response.forecast.simpleforecast.forecastday[0].icon_url);
     $("#todayIcon").append(imageToday);
     
     $("#today").append(response.forecast.simpleforecast.forecastday[0].date.weekday);
     $("#hiTempToday").append("Hi Temp: " + response.forecast.simpleforecast.forecastday[0].high.fahrenheit + " F");
     $("#lowTempToday").append("Low Temp: " + response.forecast.simpleforecast.forecastday[0].low.fahrenheit + " F");
    
     //Forecast Day 2 ---------------------->
     var imageDayTwo = $("<img>");
     imageDayTwo.attr("src", response.forecast.simpleforecast.forecastday[1].icon_url);
     $("#dayTwoIcon").append(imageDayTwo);
     
     $("#dayTwo").append(response.forecast.simpleforecast.forecastday[1].date.weekday);
     $("#hiTempDayTwo").append("Hi Temp: " + response.forecast.simpleforecast.forecastday[1].high.fahrenheit + " F");
     $("#lowTempDayTwo").append("Low Temp: " + response.forecast.simpleforecast.forecastday[1].low.fahrenheit + " F");
     
     //Forecast Day 3 -------------------->
     var imageDayThree = $("<img>");
     imageDayThree.attr("src", response.forecast.simpleforecast.forecastday[2].icon_url);
     $("#dayThreeIcon").append(imageDayThree);
     
     $("#dayThree").append(response.forecast.simpleforecast.forecastday[2].date.weekday);
     $("#hiTempDayThree").append("Hi Temp: " + response.forecast.simpleforecast.forecastday[2].high.fahrenheit + " F");
     $("#lowTempDayThree").append("Low Temp: " + response.forecast.simpleforecast.forecastday[2].low.fahrenheit + " F");
     
  
    })
  });
     
     
      
  