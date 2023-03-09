const connection = require("./config/mysql");
const fs = require("fs");
const insertIntoData = (tableName, data) => {
  connection.query(
    `INSERT INTO user (id, name, email, password, role, phone_number, profileImg) VALUES${data};`,
    (err, result) => {
      if (err) {
        console.log("ERROR---", err);
        return;
      }
      console.log(result);
    }
  );
};

const content = fs.readFileSync("./data/users.json", "utf-8");
const datas = JSON.parse(content).users;
const insertData = datas
  .map(
    (data) =>
      `(null, "${data.name}" , "${data.email}", "${data.password}", USER)`
  )
  .join();
insertIntoData("users", insertData);
console.log("first", insertData);
