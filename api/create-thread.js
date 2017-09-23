export default (request, response) => {
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const createdBy = request.body.created_by;
  const title = request.body.title;
  const description = request.body.description;
  const categoryId = request.body.category_id;

  console.log(
      latitude,
      longitude,
      createdBy,
      title,
      description,
      categoryId
  );

  response.end(JSON.stringify({
    "id": 0
  }));
}