export default (request, response) => {
  const id = Number(request.params.id);

  console.log(id);

  response.end(JSON.stringify({
    "id": id,
    "title": "test thread title",
    "latitude": 34.682007,
    "longitude": 135.498552,
    "description": "test thread description",
    "category": {
      "id": 0,
      "name": "test category"
    },
    "created_by": {
      "id": 0,
      "name": "test user",
      "image": null
    },
    "created_at": "2017-09-20 12:08:11",
    "posts": [
      {
        "id": 0,
        "content": "test post",
        "posted_by": {
          "id": 1,
          "name": "test user 2",
          "image": null
        },
        "posted_at": "2017-09-20 13:00:13"
      }
    ]
  }));
}