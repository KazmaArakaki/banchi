import getPosts from "./api/get-posts";
import getThreads from "./api/get-threads";
import createPost from "./api/create-post";
import createThread from "./api/create-thread";
import createUser from "./api/create-user";
import updateUser from "./api/update-user";

export default app => {
  app.get("/api/threads/:id/posts", getPosts);
  app.get("/api/threads/:latitude,:longitude", getThreads);
  app.post("/api/threads/:id/posts", createPost);
  app.post("/api/threads", createThread);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
}