fetch("http://localhost:3000/threads/1/posts").then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});