const express = require("express");
const app = express();
const { port } = require("./config/index");
const connection = require("./database/index");
const bodyParser = require("body-parser");

const categoryRouter = require("./routes/categoryRoute");
const workerRouter = require("./routes/workerRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connection();

app.use("/categories", categoryRouter);
app.use("/workers", workerRouter);

// server
app.listen(port, () => {
  console.log("Server is running");
});
