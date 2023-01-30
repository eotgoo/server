const express = require("express");
const cors = require("cors");
const fs = require("fs");

// const port = 8000;
const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  // res.send("amjilttai");
  res.status(200).json({ message: "Hello express server" });
});

server.post("/signup", (req, res) => {
  // const newUser = { ...req.body, id: users.length };
  // users.push(newUser);
  // res.status(201).json({ message: newUser, status: true });

  const { name, role } = req.body;
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error!!!");
      return;
    }
    console.log(data);
    const parsedData = JSON.parse(data);
    const newUser = { name, role, id: parsedData.users.length };
    parsedData.users.push(newUser);
    fs.writeFile("users.json", JSON.stringify(parsedData), (err) => {
      if (err) {
        res.status(400).json({ message: "Error" });
      }
      res.status(201).json({ message: "Created new user" });
    });
  });
});

server.get("/users", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error!!");
      return;
    }
    console.log(data);
    const parseData = JSON.parse(data);
    res.status(201).json({ users: parseData.users });
  });
  // res.status(201).json({ users });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((x) => x.id === id);

  res.status(200).json({ user });
});
server.listen(8000, () => {
  console.log("server аслаа");
});
// server.listen(port, () => {
//   console.log(`server is running at ${post}`);
// });
