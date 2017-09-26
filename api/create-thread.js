import fs from "fs";
import mysql from "mysql";

export default (request, response) => {
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const createdBy = request.body.created_by;
  const title = request.body.title || "タイトルを設定してください。";
  const description = request.body.description || "説明を追加してください。";
  const categoryId = request.body.category_id || 0;
  
  createThread({
    latitude,
    longitude,
    createdBy,
    title,
    description,
    categoryId
  }).then(data => {
    response.end(JSON.stringify(data));
  }).catch(error => {
    console.log(error);
  });
}

function createThread(values) {
  return new Promise((resolve, reject) => {
    if(!values.latitude || !values.longitude || !values.createdBy) {
      reject();
    }

    const connection = mysql.createConnection({
      "host": "localhost",
      "user": "root",
      "password": "",
      "database": "banchi_db"
    });

    connection.connect(error => {
      getSQL("create-thread.sql").then(sql => {
        const createThreadSql = mysql.format(sql, [
          values.latitude,
          values.longitude,
          values.title,
          values.description,
          values.categoryId,
          values.createdBy
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