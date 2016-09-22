        // ***************************
        // **  Google Web Services  **
        // ***************************

        function lookupLatLong_Complete(result) {
            var latitude = result.results["0"].geometry.location.lat;
            var longitude = result.results["0"].geometry.location.lng;
            console.log("The lat and long is " + latitude + ", " + longitude);
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

        // ***********************
        // **  Document ready.  **
        // ***********************

        $(function() {
            $("#lookupWeatherForPostalCode").on("click", lookupWeatherForPostalCode_Click)
        });