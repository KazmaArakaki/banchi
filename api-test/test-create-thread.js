fetch("http://localhost:3000/threads", {
  "method": "POST",
  "headers": (function(headers) {
    headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  })(),
  "body": JSON.stringify({
    "latitude": 34.682007,
    "longitude": 135.498552,
    "created_by": 1,
    "title": "test thread",
    "description": "test description",
    "category_id": 0
  })
}).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});