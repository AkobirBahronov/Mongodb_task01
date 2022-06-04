const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/create", categoryController.createData_1);

module.exports = router;
