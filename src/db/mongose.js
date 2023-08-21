const mongoose = require('mongoose')

// connect to the database
mongoose.connect("mongodb://127.0.0.1:27017" + "/task-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
