const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://127.0.0.1:27017";

// Database Name
const dbName = "task-manager";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use connect method to connect to the server
client.connect()
  .then(async () => {
    console.log("Connected correctly!");

    const db = client.db(dbName);

    // Create a collection for notes
    const notesCollection = db.collection("notes");

    // Create a new note document
    const noteDocument = {
      title: "First note",
      note: "This is my first note",
    };

    // Insert the note document into the collection
    await notesCollection.insertOne(noteDocument);
    console.log("Note inserted:", noteDocument);

  })
  .catch((err) => {
    console.log("Error!", err);
  })
  .finally(() => {
    // Close the client connection
    client.close();
  });
