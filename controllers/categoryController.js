const { CATEGORY } = require("../models/WorkerModel");

exports.createData_1 = (req, res, next) => {
  const count = 6;
  ["A", "B", "C", "D", "E", "F"].forEach(async (category) => {
    const result = new CATEGORY({
      category: category,
    });
    await result.save();
  });
};
