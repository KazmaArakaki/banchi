export default (request, response) => {
  const name = request.body.name;
  const image = request.body.image;

  console.log(
      name,
      image
  );

  response.end(JSON.stringify({
    "id": 0
  }));
}