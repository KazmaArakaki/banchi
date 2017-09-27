import fs from "fs";
import mysql from "mysql";

export default (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const nameNew = request.body.name_new || name;
  const imageNew = request.body.image_new;
  
  updateUser({
    id,
    name,
    nameNew,
    imageNew
  }).then(data => {
    response.end(JSON.stringify(data));
  });
}

function updateUser(values) {
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
      getSQL("get-user.sql").then(sql => {
        const getUserSql = mysql.format(sql, [
          values.id
        ]);
        
        connection.query(createThreadSql, (error, getUserResult, fields) => {
          if(getUserResult.name != values.name) {
            reject();
          }

          getSQL("update-user.sql").then(sql => {
            const updateUserSql = mysql.format(sql, [
              values.nameNew,
              values.imageNew
            ]);

            connection.query(updateUserSql, (error, updateUserResult, fields) => {
              resolve({
                "id": updateUserResult.id
              });
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