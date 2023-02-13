const { Router } = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const router = Router();
router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findUser = parsedData.users.find((user) => user.email === email);
  console.log(findUser);
  if (!findUser) {
    return res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
  }
  const isCheck = bcrypt.compareSync(password, findUser.password);
  if (isCheck) {
    res.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: findUser });
  } else {
    return res
      .status(401)
      .json({ message: "Имэйл эсвэл нууц үг буруу байна ш дээ.", user: null });
  }
});

module.exports = router;
