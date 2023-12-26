var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://mongodb:27017';
const dbName = 'reports';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`respond with a ${req}`);
});

// Middleware to create the collection if it doesn't exist
const createCollectionMiddleware = async (req, res, next) => {
  try {
    // Extract the collection name from the request body
    const { collectionName } = req.body;
    const { data } = req.body;

    if (!collectionName || !data) {
      return res.status(400).json({ success: false, message: 'collectionName and data properties are required in the request body' });
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);

    // Check if the collection exists
    const collections = await db.listCollections({ name: collectionName }).toArray();

    // If the collection doesn't exist, create it
    if (collections.length === 0) {
      await db.createCollection(collectionName);
      console.log(`Collection '${collectionName}' created`);
    }

    // Close the MongoDB connection
    client.close();

    // Continue to the next middleware
    next();
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Apply the createCollectionMiddleware for all routes in this router
router.use(createCollectionMiddleware);

router.post('/', async (req, res) => {
  try {
    const { collectionName, data } = req.body;
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const options = { ordered: true };
    // Insert the data into the collection
    const result = await collection.insertMany(data, options);

    // Close the MongoDB connection
    client.close();

    // Respond with success message
    res.json({ 
      success: true, 
      message: 'Data saved successfully',
      count: result.insertedCount
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
