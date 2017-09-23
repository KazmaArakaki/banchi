import getPosts from "./api/get-posts";
import getThreads from "./api/get-threads";
import createPost from "./api/create-post";
import createThread from "./api/create-thread";
import createUser from "./api/create-user";
import updateUser from "./api/update-user";

export default app => {
  app.get("/threads/:id/posts", getPosts);
  app.get("/threads/:latitude,:longitude", getThreads);
  app.post("/threads/:id/posts", createPost);
  app.post("/threads", createThread);
  app.post("/users", createUser);
  app.put("/users/:id", updateUser);
}