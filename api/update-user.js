export default (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const nameNew = request.body.name_new;
  const imageNew = request.body.image_new;

  console.log(
      id,
      name,
      nameNew,
      imageNew
  );

  response.end(JSON.stringify({
    "id": id
  }));
}