fetch("http://localhost:3000/api/threads/34.682007,135.498552").then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});