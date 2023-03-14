const { Router } = require("express");

const router = Router();
const {
  getAllUsers,
  getUser,
  // deleteUser,
  // updateUser,
  createUser,
} = require("../controllers/users");
router.post("/signup", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
// router.put("/:id", updateUser).delete("/:id", deleteUser);

module.exports = router;
