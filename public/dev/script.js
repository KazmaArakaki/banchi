

function initMap() {
    const mapContainer = document.getElementById("map");
  
    const map = new google.maps.Map(mapContainer, {
      "center": {
        "lat": 34.682007,
        "lng": 135.498626
      },
      "zoom": 16,
      "maxZoom": 21,
      "minZoom": 16,
      "disableDefaultUI": true,
      "zoomControl": true
    });
}

function getPosition(){
    navigator.geolocation.getCurrentPosition(
        function(position){
            iniMap.map.setCenter(position);
        }
    )
}