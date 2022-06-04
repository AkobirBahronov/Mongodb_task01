const express = require("express");

const router = express.Router();
const workerController = require("../controllers/workerController");

router.post("/create", workerController.createData_1);

router.get("/getWorker", workerController.getBestWorker2017_2019);

router.get("/getUSA2019", workerController.getUSA2019Bonus);

router.get("/getFacebookWorkers", workerController.getFaceBookWorkers);

router.get("/getDWorkers", workerController.getDWorkers);

router.get("/getGoogleTwitterAmazon", workerController.getGoogleTwitterAmazon);

router.get("/getCanadianWorkers", workerController.getCanadianWorkers);

module.exports = router;
