fetch("http://localhost:3000/threads/1/posts", {
  "method": "POST",
  "headers": (function(headers) {
    headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  })(),
  "body": JSON.stringify({
    "content": "test post",
    "reply_to": 1,
    "posted_by": 1
  })
}).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});