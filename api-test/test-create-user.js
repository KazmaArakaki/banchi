fetch("http://localhost:3000/users", {
  "method": "POST",
  "headers": (function(headers) {
    headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  })(),
  "body": JSON.stringify({
    "name": "id1234idid12345"
  })
}).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});