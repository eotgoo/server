const { Router } = require("express");

const {
  getCategories,
  deleteCategory,
  updateCategory,
  createCategory,
} = require("../controllers/categories");
const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
module.exports = router;
