import fs from "fs";
import mysql from "mysql";

export default (request, response) => {
  const id = request.params.id;
  const content = request.body.content;
  const replyTo = request.body.reply_to || null;
  const postedBy = request.body.posted_by;

  createPost({
    id,
    content,
    replyTo,
    postedBy
  }).then(data => {
    response.end(JSON.stringify(data));
  });
}

function createPost(values) {
  return new Promise((resolve, reject) => {
    if(!values.content || !values.postedBy) {
      reject();
    }

    const connection = mysql.createConnection({
      "host": "localhost",
      "user": "root",
      "password": "",
      "database": "banchi_db"
    });

    connection.connect(error => {
      getSQL("create-post.sql").then(sql => {
        const createThreadSql = mysql.format(sql, [
          values.content,
          values.replyTo,
          values.postedBy
        ]);
        
        connection.query(createThreadSql, (error, threadResult, fields) => {
          resolve({
            "id": threadResult.insertId
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