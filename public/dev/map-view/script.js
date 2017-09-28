function initMap() {
  const mapContainer = document.getElementById("map");
  const latitude = 34.649946;
  const longitude = 135.469096;

  const map = new google.maps.Map(mapContainer, {
    "center": {
      "lat": latitude,
      "lng": longitude
    },
    "zoom": 16
  });

  const circle = new google.maps.Circle({
    "map": map,
    "radius": 5 * 1000,
    "center": {
      "lat": latitude,
      "lng": longitude
    },
    "fillColor": "#cc3333",
    "fillOpacity": 0.5,
    "strokeColor": "#cc3333",
    "strokeOpacity": 1,
    "strokeWeight": 1
  });

  fetch("/api/threads/" + latitude + "," + longitude).then(response => {
    return response.json();
  }).then(data => {
    data.forEach(spot => {
      const marker = new google.maps.Marker({
        "map": map,
        "position": {
          "lat": spot.latitude,
          "lng": spot.longitude
        }
      });
      
      const infoWindow = new google.maps.InfoWindow({
        "content": spot.title
      });
      
      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });
    });
  });
}