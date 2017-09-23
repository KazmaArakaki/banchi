export default (request, response) => {
  const latitude = Number(request.params.latitude);
  const longitude = Number(request.params.longitude);
  
  console.log(latitude, longitude);
  
  response.end(JSON.stringify([
    {
      "id": 0,
      "title": "test thread title",
      "latitude": latitude,
      "longitude": longitude,
      "description": "test thread description",
      "category": {
        "id": 0,
        "name": "test category"
      }
    }
  ]));
}