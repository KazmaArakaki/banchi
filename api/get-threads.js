import fs from "fs";
import mysql from "mysql";

export default (request, response) => {
  const latitude = Number(request.params.latitude);
  const longitude = Number(request.params.longitude);
  
  getThreads(latitude, longitude).then(data => {
    response.end(JSON.stringify(data));
  });
}

function getThreads(latitude, longitude) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      "host": "localhost",
      "user": "root",
      "password": "",
      "database": "banchi_db"
    });

    connection.connect(error => {
      getSQL("get-threads.sql").then(sql => {
        const getThreadsSql = mysql.format(sql, [latitude, longitude, latitude]);

        connection.query(getThreadsSql, (error, result, fields) => {
          resolve(result.map(resultItem => {
            return {
              "id": resultItem.threadId,
              "title": resultItem.threadTitle,
              "latitude": resultItem.latitude,
              "longitude": resultItem.longitude,
              "description": resultItem.threadDescription,
              "category": {
                "id": resultItem.categoryId,
                "name": resultItem.categoryName
              }
            };
          }));
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