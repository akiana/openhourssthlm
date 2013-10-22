
  var map;
  var infowindow;

  function initialize() {
    var pyrmont = new google.maps.LatLng(59.324663,18.064957);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: pyrmont,
      zoom: 13
    });

    var request = {
      location: pyrmont,
      radius: 5000,
      types: ['store'],
      keyword: ['clothes'],
      openNow: true
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

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
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      //var service = new google.maps.places.PlacesService(map);
      var request = {reference : place.reference};
      //service.getDetails(request, detail);

      var service = new google.maps.places.PlacesService(map);

      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            var d = new Date();
            infowindow.setContent("<strong>Name: </strong>" + place.name + "<br />" + "<strong> Opens: </strong>" + place.opening_hours.periods[d.getDay()].open.time.slice(0,2) + "." + place.opening_hours.periods[d.getDay()].open.time.slice(2,4) + "<br />" + "<strong> Closes: </strong>" + place.opening_hours.periods[d.getDay()].close.time.slice(0,2) + "." + place.opening_hours.periods[d.getDay()].close.time.slice(2,4));
            infowindow.open(map, this);
          });
        }
      });
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
