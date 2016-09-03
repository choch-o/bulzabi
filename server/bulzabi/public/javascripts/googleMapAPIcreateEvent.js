var map;
var markers = [];
var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var labelIndex = 0;

//route
var directionDisplay;
var directionsService;

//geocoding
var geocoder;
//autocomplete
var autocomplete;


/*
 * Initialize Google Map functions - initMap
 */
function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  geocoder = new google.maps.Geocoder();
  var mapholder = document.getElementById("mapholder");
  var FireStationLatlon = new google.maps.LatLng(37.452490, 126.675695);
  var maxZoomLevel = 15;

  var myOptions = {
    center: FireStationLatlon,
    zoom: maxZoomLevel,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
  }
  map = new google.maps.Map(mapholder, myOptions);
  directionsDisplay.setMap(map);

  autocomplete = new google.maps.places.Autocomplete( (document.getElementById('textAddress')), { types: ['establishment'] });
  autocomplete.addListener('place_changed', onPlaceChanged);


/*
  // Bounds for area
  var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(36.977536, -122.068339),
    new google.maps.LatLng(37.005027, -122.052031)
  );
  // Set marker by click
  google.maps.event.addListener(map, 'click', function(event) {
    removeAllMarker();
    marker = addMarker(event.latLng, map);
    $('#event_coordinate').val(event.latLng.lat() + ", " + event.latLng.lng());
  });


  // Listen for the dragend event
  google.maps.event.addListener(map, 'dragend', function () {
    if (strictBounds.contains(map.getCenter())) return;

    // We're out of bounds - Move the map back within the bounds

    var c = map.getCenter(),
        x = c.lng(),
        y = c.lat(),
        maxX = strictBounds.getNorthEast().lng(),
        maxY = strictBounds.getNorthEast().lat(),
        minX = strictBounds.getSouthWest().lng(),
        minY = strictBounds.getSouthWest().lat();

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;

    map.setCenter(new google.maps.LatLng(y, x));
  });

  // Limit the zoom level
  google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < maxZoomLevel) map.setZoom(maxZoomLevel);
  });
*/
}

/*
 * Marker functions - addMarker, showAllMarker, hideAllMarker, removeAllMarker, removeFirstMarker
 */
function addMarker(latlng, tooltip, icon) {
  if (icon == 'circle') {
    icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6
    };
  } else if (icon == 'mark') {
    icon = {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 5,
      strokeColor: 'gold',
      strokeWeight: 3
  };
  }

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latlng[0], latlng[1]),
    map: map,
    label: tooltip,
    icon: icon,
    //label: labels[labelIndex++ % labels.length]
  });
  markers.push(marker);
}

function addRoute(start, end) {
  var startLatlng = new google.maps.LatLng(start[0], start[1]);
  var endLatlng = new google.maps.LatLng(end[0], end[1]);
  var request = {
    origin: startLatlng,
    destination: endLatlng,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    } else {
      console.log("addRoute: fail", result, status);
    }
  });
}

function addPolyLine(latlngs) {
  var latlngList = []
  for (var latlng of latlngs) {
    latlngList.push({lat: latlng[0], lng: latlng[1]});
  }

  var polyLine = new google.maps.Polyline({
    path: latlngList,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  polyLine.setMap(map);
}

function drawCircle(latlng, radius) {
  var center = new google.maps.LatLng(latlng[0], latlng[1]);
  new google.maps.Circle({
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000FF',
    fillOpacity: 0.35,
    map: map,
    center: center,
    radius: radius
  });
}

function codeAddressToLatlng(address) {
  return new Promise(function(resolve, reject) {
    geocoder.geocode( { 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        addressString = results[0].geometry.location.toString();
        console.log("codeAddressToLatlng: "+address+" is converted to "+addressString);
        resolve(addressString);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
        reject();
      }
    });
  });
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
  } else {
    document.getElementById('textAddress').placeholder = 'Enter a city';
  }
}

function showAllMarker() {
  for (var i=0; i<markers.length; i++) {
    markers[i].setMap(map);
  }
}
function hideAllMarker() {
  for (var i=0; i<markers.length; i++) {
    markers[i].setMap(null);
  }
}
function removeAllMarker() {
  for (var i=0; i<markers.length; i++) {
    markers[i].setMap(null);
    markers[i] = null;
  }
  markers = [];
}
function removeFirstMarker() {
  markers[0].setMap(null);
  markers = markers.slice(1);
}
function bounceMarker(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
}
function stopBounceMarker(marker) {
  marker.setAnimation(null);
}
function bounceOnceMarker(marker) {
  bounceMarker(marker);
  setTimeout(function(){stopBounceMarker(marker);}, 750);
}
function addPopupOnMarker(marker, content) {
  var infowindow = new google.maps.InfoWindow({
    content: content
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

/*
 * Getting Current Location Function - getLocation, showPosition, showError
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.querySelector("article").innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var mapholder = document.getElementById("mapholder");
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var currentLatlon = new google.maps.LatLng(lat, lng);
  var myOptions = {
    center: currentLatlon,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
  }
  map = new google.maps.Map(mapholder, myOptions);
  var marker = new google.maps.Marker({position:currentLatlon, map:map, title: "You Are Here"});
}
function showError(error) {
  var mapholder = document.getElementById("mapholder");
  switch(error.code) {
    case error.PERMISSION_DENIED:
      mapholder.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      mapholder.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      mapholder.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      mapholder.innerHTML = "An unknown error occurred."
      break;
  }
}
