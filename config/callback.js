module.exports = {
  callbackServer: function () {
    return "Server is running";
  },
  callbackDatabase: function () {
    return "Database is running";
  },
  callbackSuccessJson: (res, msg) => {
    return new Object({ message: "Successfully " + msg, data: res });
  },
  callbackErrorJson: (res, msg) => {
    return new Object({ message: "Error " + msg, data: res });
  },
};
