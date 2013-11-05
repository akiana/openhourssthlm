   

    //STATING MAP AND INFOWINDOW AS VARIABLES//
    var map;
    var infowindow;

    //INITIALIZING THE MAP SET CENTER TO STOCKHOLM//
    function initialize() {
    	var stockholm = new google.maps.LatLng(59.324663,18.064957);
    	map = new google.maps.Map(document.getElementById('map-canvas'), {
    		mapTypeId: google.maps.MapTypeId.ROADMAP,
    		center: stockholm,
    		zoom: 13
    	});

  // VARIABLE OF REQUESTED DATA  - this is the code to change later on but can we do this in JAVASCRIPT? We only learned how to do that in the HTML-text...? //
  var request = {
  	location: stockholm,
  	radius: 50000,
  	types: ['store'],
    //openNow: true
};

  // FOR COMPLETED REQUEST USE FUNCTION CALLBACK THAT IS STATED BELOW ??//
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

  //function testOpen(results) {
    //if (place.opening_hours.open_now == true) {
      //console.log('YEEEHAAAA')
    //}
  //}

  // SHOW MARKERS ON MAP FOR EVERY RESULT AND LOOP THROUGH THE PLACES API //
  function callback(results, status) {
  	if (status == google.maps.places.PlacesServiceStatus.OK) {
  		for (var i = 0; i < results.length; i++) {
  			createMarker(results[i]);
  		}
  	}
  }

  // FUNCTION THAT CREATES MARKER ON THE LOCATIONS SET IN THE API. GEOMETRY = LngLat // 
  function createMarker(place) {
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
  		map: map,
  		position: placeLoc
  	});

  //
  google.maps.event.addListener(marker, 'click', function() {
  	infowindow.setContent(place.name);
  	infowindow.open(map, this);
  });
}

	// WHEN WINDOR LOADS USE FUNCTION INITIALIZE //
	google.maps.event.addDomListener(window, 'load', initialize);



//
       function callback(results, status) {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
         }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
         position: place.geometry.location
        });
