const express = require("express");
require("./db/mongose");

const app = express();
//
app.use(express.json());
app.use(require("morgan")("dev"));

// Routers
app.use("/users", require("./routers/user.router"));
app.use("/tasks", require("./routers/task.router"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  const host = server.address().address;

  console.log("Example app listening at http://%s:%s", host, PORT);
});
