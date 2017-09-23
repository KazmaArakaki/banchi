export default (request, response) => {
  const id = request.params.id;
  const content = request.body.content;
  const replyTo = request.body.reply_to;
  const postedBy = request.body.posted_by;

  response.end(JSON.stringify({
    "id": id
  }));
}