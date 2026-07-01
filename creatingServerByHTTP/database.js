const { MongoClient } = require('mongodb');

const url = "mongodb+srv://siddhantk80044_db_user:INrskI5x2cLQqIX8@cluster0.8lkcekl.mongodb.net/?appName=Cluster0";

const client = new MongoClient(url);

const dbName = "test";

async function connectDB() {
    await client.connect();
    console.log("connected to db");

    const db = client.db(dbName);
    const collection = db.collection("notes");

    const notes = await collection.find({}).toArray();

    console.log(notes);

    return notes;
}

connectDB()
    .then(() => console.log("done"))
    .catch(console.error)
    .finally(() => client.close());