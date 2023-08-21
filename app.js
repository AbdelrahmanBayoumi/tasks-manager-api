
// connect to the database
mongoose.connect("mongodb://127.0.0.1:27017" + "/task-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// check if the connection is successful
console.log("Connected correctly!");



// create a new task
const task = new Task({
  description: "This is my first task",
});

// save the task to the database
// task
//   .save()
//   .then(() => console.log(task))
//   .catch((error) => console.log(error));

// create a new user
const user = new User({
  name: "  Andrew  ",
  email: "test@test.com",
  age: 27,
});

// save the user to the database
user
  .save()
  .then(() => console.log(user))
  .catch((error) => console.log(error));
