////javascript.js
//
//
////set map options
//
// var lat;
//var long;
//if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
//} else {
//    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
//}
//
//function successFunction(position) {
//    var lat = position.coords.latitude;
//    var long = position.coords.longitude;
//    console.log('Your latitude is :'+lat+' and longitude is '+long);
//}
            
var myLatLng = {lat: 51.5, lng: -0.1};
           
var mapOptions = 
    {
                center: myLatLng,
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP       
    };
            
//create map
            
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
            
var directionsService = new google.maps.DirectionsService();
            
//create a DirectionsRenderer object which we will use to display the route

var directionsDisplay = new google.maps.DirectionsRenderer();
            

//bind the DirectionsRenderer to the map

directionsDisplay.setMap(map);


//define calcRoute function

function calcRoute(){
    //Create request
    
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
   //pass the request to the route method


    directionsService.route(request, function(result, status){
        
        //if status OK
        if(status == google.maps.DirectionsStatus.OK){
            //Get distance and time
            $("#output").html("<div class='alert-info'>From: "+document.getElementById("from").value+".<br />To: "+document.getElementById("to").value+".<br /> Driving distance: "+result.routes[0].legs[0].distance.text+".<br />Duration: "+result.routes[0].legs[0].duration.text+".</div>");

            //display route using DirectionsRenderer object
            directionsDisplay.setDirections(result);
        }else{
            //if status not OK
            //delete route from map
            directionsDisplay.setDirections({routes: []});
            //center map in London
            map.setCenter(myLatLng);
            
            //show error message
            $("#output").html("<div class='alert-danger'>Could not retrieve driving distance.</div>");
        }
    });
}

//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']   
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);