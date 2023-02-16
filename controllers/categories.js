const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const filePath = "./data/categories.json";
const getCategories = (req, res) => {
  try {
    const categoriesData = fs.readFileSync(filePath, "utf-8");
    console.log("CC", categoriesData);
    const data = JSON.parse(categoriesData);
    console.log("DD", data);
    res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const createCategory = (req, res) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    console.log("Con", content);
    const id = uuidv4();
    const data = JSON.parse(content);
    console.log("Data", data.categories);
    const newData = { ...req.body };
    data.categories.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Амжилттай үүсгэлээ.", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const updateCategory = (req, res) => {
  try {
    const categoriesData = fs.readFileSync(filePath, "utf-8");
    console.log("CC", categoriesData);
    const data = JSON.parse(categoriesData);
    console.log("DD", data);
    const findIndex = data.categoriesData.findIndex(
      (el) => el.id === req.params.id
    );

    if (findIndex === -1) {
      return res.status(404).json({ message: "not found", data: null });
    }

    data.categoriesData[findIndex] = {
      ...data.categoriesData[findIndex],
      ...req.body,
    };

    fs.writeFileSync(filePath, JSON.stringify(data));
    res
      .status(200)
      .json({ message: "success", data: data.categoriesData[findIndex] });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteCategory = (req, res) => {
  try {
    const categoriesData = fs.readFileSync("./data/categories.json", "utf-8");
    console.log("CC", categoriesData);
    const data = JSON.parse(categoriesData);
    console.log("DD", data);
    const findArr = data.categoriesData.filter((el) => el.id !== req.params.id);
    const deletedCategory = data.categoriesData.find(
      (el) => el.id === req.params.id
    );

    if (!(findArr.length > 0)) {
      return res.status(404).json({ message: "not found", data: null });
    }

    data.categoriesData = findArr;

    fs.writeFileSync("./data/categories.json", JSON.stringify(data));
    res.status(200).json({ message: "success", data: deletedCategory });
  } catch (error) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
};
