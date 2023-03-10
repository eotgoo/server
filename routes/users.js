const { Router } = require("express");

const { getAllUsers, createUser } = require("../controllers/users");

const router = Router();

router.post("/signup", createUser);
// router.post("/signin", signIn);

router.get("/", getAllUsers);
// router.get("/:id", getUser);
// router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);

module.exports = router;
