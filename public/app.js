
//function for index page
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 43.653226, lng: -79.383184}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
    
    
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  let coordinate = {};
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);

       //getting the coordinate
       lat = results[0].geometry.location.lat();
       lng = results[0].geometry.location.lng();

       //rendering the coordinates to the server
      window.location.href = "/search/" + lat + "&" + lng ; 
    
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location  
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }   
  });    
}
