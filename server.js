const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const signInRoute = require("./routes/signin");
const signUpRoute = require("./routes/signup");

const port = 8000;
const server = express();
//middlewares
server.use(cors());
server.use(express.json());
server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);
server.use("/signin", signInRoute);
server.use("/signup", signUpRoute);

server.listen(port, () => {
  console.log(`server is running at ${port}`);
});
