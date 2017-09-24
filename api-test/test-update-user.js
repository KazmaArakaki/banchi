fetch("http://localhost:3000/api/users/1", {
  "method": "PUT",
  "headers": (function(headers) {
    headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  })(),
  "body": JSON.stringify({
    "name": "test user",
    "name_new": "sample user",
    "image_new": "avater-1.jpg"
  })
}).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});