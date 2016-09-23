// ***************************
// **  Google  Geo  Coding  **
// ***************************
var locations = " ";
var min = " ";
var max = " ";
var currentTemp = " ";
var currentSum = " ";
var precip = " ";

function lookupLatLong_Complete(result) {
    var latitude = result.results["0"].geometry.location.lat;
    var longitude = result.results["0"].geometry.location.lng;
    console.log("The lat and long is " + latitude + "," + longitude);
    locations = result.results[0].formatted_address;
    console.log(locations);
    //call darksky api
    var darkskyUrl = "https://api.darksky.net/forecast/0f956e7658608475cc87493ac0a33397/" + latitude + "," + longitude;
    localWeather(darkskyUrl);

}
function darksky_Complete(result) {
    precip = result.daily.data[0].precipProbability;
        min = result.daily.data[0].temperatureMin;
        max = result.daily.data[0].temperatureMax;
        currentTemp = result.currently.temperature;
        currentSum = result.currently.summary;
        testGenerateCard();
}
function localWeather(darkskyUrl) {
    var weather = {
        url: darkskyUrl,
        dataType: "jsonp",
        success: darksky_Complete
    };
    $.ajax(weather);
}

function lookupLatLong(city, state, postalCode) {
    // Create the address.
    var address = "";
    if (postalCode.length != 0) {
        address = postalCode.trim();
    }
    else if (city.length != 0 && state != 0) {
        address = city.trim() + ", " + state;
    }
    else {
        return; // they didn't give me anything valid, so exit
    }


    // Call Google's API.
    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAQsMF6GQMAD_JlBLibE1ZprVVwxK0kfac";

    var request = {
        url: googleUrl,
        success: lookupLatLong_Complete
    };

    $.ajax(request);
}

// **********************
// **  Event Handlers  **
// **********************
function lookupWeatherForPostalCode_Click() {
    var pcode = $("#postalCode").val();
    lookupLatLong("", "", pcode);
}

// Card generation
function generateCard(personInfo) {
    // Insert the original HTML into a string by reading from the div. I wrote the HTML first, tested it looked right, 
    // then grabbed it as a string by asking jQuery to go get me the HTML from the DOM.
    var template = $("#templateDiv").html(); // gets the html from inside the templateDiv div

    // Swap out the values.
    template = template.replace("@@NAME@@", personInfo.name);
    template = template.replace("@@TEMP@@", personInfo.temp);
    template = template.replace("@@MIN@@", personInfo.min);
    template = template.replace("@@HIGH@@", personInfo.high);
    template = template.replace("@@RAINCHANCE@@", personInfo.rainchance);
    template = template.replace("@@CURRSUMMARY@@", personInfo.currsummary);

    // Return the new HTML.
    return template;
}

function testGenerateCard() {
    var sampleData = {
        name: locations,
        temp: currentTemp,
        min: min,
        high: max,
        rainchance: precip,
        currsummary: currentSum
    };

    // The divs will automatically wrap because of Bootstrap knowing it's a col-md-3.
    var html = generateCard(sampleData);
    $("#cards").append(html);

    $(document).on('click', '#removeCard', function () {
        $(this).closest('div').remove();
    });
}
// ***********************
// **  Document ready.  **
// ***********************

$(function () {
    $("#lookupWeatherForPostalCode").on("click", lookupWeatherForPostalCode_Click)
    $(document).on('click', '#removeCard', function () {
        $(this).closest('div').remove();
    });
});

