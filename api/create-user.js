import fs from "fs";
import mysql from "mysql";

export default (request, response) => {
  const name = request.body.name || Array.from(new Array(15)).map(() => {
    return Array.from(new Array(26)).map(
        (c, i) => String.fromCharCode("A".charCodeAt(0) + i)
    ).concat(Array.from(new Array(26)).map(
        (c, i) => String.fromCharCode("a".charCodeAt(0) + i)
    )).concat(Array.from(new Array(10)).map(
        (n, i) => String(n)
    ))[Math.floor(Math.random() * 62)];
  }).join("");;
  const image = request.body.image || null;

  createUser({
    name,
    image
  }).then(data => {
    response.end(JSON.stringify(data));
  });
}

function createUser(values) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      "host": "localhost",
      "user": "root",
      "password": "",
      "database": "banchi_db"
    });

    connection.connect(error => {
      getSQL("create-user.sql").then(sql => {
        const createUserSql = mysql.format(sql, [
          values.name,
          values.image
        ]);
        
        connection.query(createUserSql, (error, userResult, fields) => {
          resolve({
            "id": userResult.insertId
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