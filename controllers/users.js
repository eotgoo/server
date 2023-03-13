const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const connection = require("../config/db");

const filePath = "./data/users.json";
const getAllUsers = (req, res) => {
  connection.query("SELECT * FROM users", (err, result, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: "Huselt amjilttai", data: result });
  });
};
const createUser = (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);

  const query =
    "INSERT INTO user (id, name, email , password,  phone_number, profileImg) VALUES(null,  ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, hashedPassword, phoneNumber, "url"],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({
        message: "Шинэ хэрэглэгч амжилттай бүртгэгдлээ.",
        data: result,
      });
    }
  );
};

// const getAllUsers = (req, result) => {
//   fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) {
//     console.log("Файл уншихад алдаа гарлаа. !!!");
//     return;
//   }
//   console.log(data);
//   const parsedData = JSON.parse(data);
//   res.status(201).json({ users: parsedData.users });
//   });
// };

const getUser = (req, res) => {
  const { id } = req.params;

  connection.query(`SELECT * FROM users WHERE id =  ${id}`, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: "Huselt amjilttai", data: result });
  });
  // const { id } = req.params;
  // const data = fs.readFileSync(filePath, "utf-8");
  // const parsedData = JSON.parse(data);
  // const user = parsedData.users.find((el) => el.id === id);
  // res.status(200).json({ user });
};

// const createUser = (req, res) => {
//   const { name, role = "user", email, password } = req.body;
//   const data = fs.readFileSync(filePath, "utf-8");
//   const parsedData = JSON.parse(data);
//   const id = uuidv4();
//   const salted = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(password, salted);
//   console.log(hashedPassword);
//   const newUser = {
//     id,
//     name,
//     role,
//     email,
//     password: hashedPassword,
//   };
//   parsedData.users.push(newUser);
//   fs.writeFileSync(filePath, JSON.stringify(parsedData));
//   res.status(201).json({ message: "Шинэ хэрэглэгчийг амжилттай бүртгэлээ." });
// };
const updateUser = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const convertToStr = (body) => {
    const keys = Object.keys(body);
    const a = keys.map((key) => `${key}='${body[key]}'`).join();
    return a;
  };
  const updateQuery = convertToStr(body);
  connection.query(
    `UPDATE users SET ${updateQuery} WHERE id = ${id}`,
    (err, result, fieldsz) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({
        message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." + id,
        data: result,
      });
    }
  );
  // const { id } = req.params;
  // const { name } = req.body;
  // const data = fs.readFileSync(filePath, "utf-8");
  // const parsedData = JSON.parse(data);
  // const findIndex = parsedData.users.findIndex((el) => el.id === id);
  // parsedData.users[findIndex].name = name;
  // fs.writeFileSync(filePath, JSON.stringify(parsedData));
  // res
  //   .status(201)
  //   .json({ message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." });
};
const deleteUser = (req, res) => {
  // const { id } = req.params;
  // const data = fs.readFileSync(filePath, "utf-8");
  // const parsedData = JSON.parse(data);
  // const findIndex = parsedData.users.findIndex((el) => el.id === id);
  // parsedData.users.splice(findIndex, 1);
  // fs.writeFileSync(filePath, JSON.stringify(parsedData));
  // res
  //   .status(201)
  //   .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
  const { id } = req.params;
  connection.query(
    `DELETE FROM users WHERE id =${id} `,
    (err, result, fields) => {
      if (err) {
        res.status(400).json({ message: err.message });
      }
      res
        .status(201)
        .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
    }
  );
};

// const signIn = (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   const data = fs.readFileSync(filePath, "utf-8");
//   const parsedData = JSON.parse(data);
//   const findUser = parsedData.users.find((user) => user.email === email);
//   console.log(findUser);
//   if (!findUser) {
//     return res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
//   }
//   const isCheck = bcrypt.compareSync(password, findUser.password);
//   if (isCheck) {
//     res.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: findUser });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Имэйл эсвэл нууц үг буруу байна ш дээ.", user: null });
//   }
// };

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
};
