const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

//connection mysql

const port = 8000;
const server = express();
//middlewares
server.use(cors());
server.use(express.json());

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

// server.get("/", async (req, res) => {
//   connection.query(`SELECT * FROM azure_user`, (err, result) => {
//     if (err) {
//       res.status(400).json({ message: err.message });
//       return;
//     }
//     res.status(200).json({ message: "amjilttai", data: result });
//   });
// });
// server.get("/:id", async (req, res) => {
//   connection.query(
//     `SELECT * FROM azure_user WHERE aid=${req.params.id}`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });
//         return;
//       }
//       res
//         .status(200)
//         .json({ message: req.params.id + " idtai hereglegch", data: result });
//     }
//   );
// });
// server.put("/:id", async (req, res) => {
//   const body = req.body;
//   const convertToStr = (body) => {
//     const keys = Object.keys(body);
//     const db = keys.map((key) => `${key}='${body[key]}'`).join();
//     return db;
//   };
//   const updateQuery = convertToStr(body);
//   connection.query(
//     // `UPDATE azure_user SET name = "${req.body.name}" , last_name = "${req.body.last_name}"  WHERE aid=${req.params.id}`,
//     `UPDATE azure_user SET ${updateQuery} WHERE aid=${req.params.id}`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });
//         return;
//       }
//       res.status(200).json({ message: "amjilttai soligdlo", data: result });
//     }
//   );
// });
// server.delete("/:id", async (req, res) => {
//   connection.query(
//     `DELETE FROM azure_user WHERE aid=${req.params.id}`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });
//         return;
//       }
//       res.status(200).json({ message: "amjilttai ustgagdla", data: result });
//     }
//   );
// });

// server.post("/", async (req, res) => {
//   connection.query(
//     `INSERT INTO  azure_user VALUES(${req.body.aid} , "${req.body.name}" , "${req.body.last_name}" )`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });
//         return;
//       }
//       res.status(200).json({ message: "amjilttai nmegdle", data: result });
//     }
//   );
// });

server.listen(port, () => {
  console.log(`server is running at ${port}`);
});
