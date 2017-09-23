import fs from "fs";
import mysql from "mysql";

export default (request, response) => {
  const id = Number(request.params.id);

  getPosts(id).then(data => {
    response.end(JSON.stringify(data));
  });
}

function getPosts(threadId) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      "host": "localhost",
      "user": "root",
      "password": "",
      "database": "banchi_db"
    });

    connection.connect(error => {
      Promise.all([
        getSQL("get-thread.sql"),
        getSQL("get-posts.sql")
      ]).then(sqls => {
        const getThreadSql = mysql.format(sqls[0], threadId);
    
        connection.query(getThreadSql, (error, threadResult, fields) => {
          const getPostsSql = mysql.format(sqls[1], threadId);

          connection.query(getPostsSql, (error, postsResult, fields) => {
            console.log(postsResult);

            resolve({
              "id": threadResult[0].threadId,
              "title": threadResult[0].threadTitle,
              "latitude": threadResult[0].latitude,
              "longitude": threadResult[0].longitude,
              "description": threadResult[0].threadDescription,
              "category": {
                "id": threadResult[0].categoryId,
                "name": threadResult[0].categoryName
              },
              "created_by": {
                "id": threadResult[0].userId,
                "name": threadResult[0].userName,
                "image": threadResult[0].userImage
              },
              "created_at": threadResult[0].threadCreatedAt,
              "posts": postsResult.map(postResult => {
                return {
                  "id": postResult.postId,
                  "content": postResult.postContent,
                  "posted_by": {
                    "id": postResult.userId,
                    "name": postResult.userName,
                    "image": postResult.userImage
                  },
                  "reply_to": postResult.postReplyTo,
                  "posted_at": postResult.postPostedAt
                }
              })
            });
          });
        });
      });
    });
  });
}

function getSQL(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile("./sql/" + fileName, "utf8", (error, sql) => {
      resolve(sql);
    });
  });
}