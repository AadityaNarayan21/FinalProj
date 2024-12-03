// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const app = express();
// const port = 5000; // Backend runs on port 5000

// // Middleware
// app.use(cors());  // Allows requests from the frontend
// app.use(express.json());

// // MongoDB connection URI
// const uri = 'mongodb://localhost:27017';  // Replace with your MongoDB URI
// const dbName = 'soil_data';               // Replace with your database name
// const collectionName = 'samples';         // Replace with your collection name

// // Route to fetch the first 10 documents from MongoDB
// app.get('/api/soil-data', async (req, res) => {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Fetch the first 10 documents
//     const data = await collection.find({}).limit(10).toArray();

//     res.json(data); // Send the data as a JSON response

//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data', error });
//   } finally {
//     await client.close();
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection URI directly in the code
const uri = 'mongodb+srv://aaditya:aaditya@project.bklgo.mongodb.net/soil_data?retryWrites=true&w=majority';

// Database and collection names
const dbName = 'soil_data';
const collectionName = 'samples';

app.get('/api/soil-data', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch the first 10 documents
    const data = await collection.find({}).limit(10).toArray();

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
