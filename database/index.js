const mongoose = require("mongoose");
const { callbackDatabase } = require("../config/callback");
const { database_url, database_option } = require("../config/index");

const connection = () => {
  mongoose
    .connect(database_url, database_option)
    .then(() => {
      console.log(callbackDatabase());
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports = connection;
