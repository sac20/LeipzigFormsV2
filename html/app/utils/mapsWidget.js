// Este es el archivo que se encarga de mostrar el mapa y la ciudad seleccionada

var map;
var service;
function initMap() {

  var sydney = new google.maps.LatLng(-33.867, 151.195);

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: document.getElementById("placename").textContent,
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
        });
        map.setCenter(results[0].geometry.location);
    }
  })
}
  
   window.initMap = initMap;
