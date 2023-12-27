var express = require('express');
var router = express.Router();
const roundNumber = require("../util/decimalPrecision")
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://mongodb:27017';
const dbName = 'reports';

/* GET all collections. */
router.get('/', async function(req, res, next) {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    // Get a list of collection names
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);

    // Close the MongoDB connection
    client.close();

    // Respond with the list of collection names
    res.json({ collections: collectionNames });
  } catch (error) {
    console.error('Error fetching collection names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    // Get the collection name from the path parameter
    const collectionName = req.params.id;

    // Check if the collection exists
    const collectionExists = await db.listCollections({ name: collectionName }).hasNext();

    if (!collectionExists) {
      // If the collection doesn't exist, return a 404 response
      res.status(404).json({ error: 'Report not found' });
      return;
    }
    // Retrieve all items from the specified collection
    const items = await db.collection(collectionName).find({}).toArray();

    const processedItems = await Promise.all(items.map(async (item) => {
      let ud = 0;
      let up = 0;
      for (const key of Object.keys(item)) {
        if (["ud", "up", "_id"].includes(key)) continue
        if (key.endsWith('d'))
          ud += item[key];
        if (key.endsWith('p') && key !== 'up')
          up += item[key];
      }
      let saldo = ud - up;
      ud = roundNumber(ud, 2);
      up = roundNumber(up, 2);
      saldo = roundNumber(saldo, 2);
      await db.collection(collectionName).updateOne({ _id: item._id }, { $set: { ud, up, saldo } });
      return {...item, ud:roundNumber(ud, 2), up:roundNumber(up,2), saldo: roundNumber(saldo, 2)}
    }));

    // Close the MongoDB connection
    client.close();

    // Respond with the items
    res.json({ report: processedItems });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Middleware to create the collection if it doesn't exist
const createCollectionMiddleware = async (req, res, next) => {
  try {
    // Extract the collection name from the request body
    let { collectionName, data, fieldsToUpdate } = req.body;

    if (!collectionName || !data || !fieldsToUpdate) {
      return res.status(400).json({ success: false, message: 'Missing required properties in the request body' });
    }

    collectionName = collectionName.split(" ")[0]

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


router.post('/', createCollectionMiddleware, async (req, res) => {
  fieldsMap = {
    "ps": {"psp": 0, "psd": 0},
    "01": {"01p": 0, "01d": 0},
    "02": {"02p": 0, "02d": 0},
    "03": {"03p": 0, "03d": 0},
    "04": {"04p": 0, "04d": 0},
    "05": {"05p": 0, "05d": 0},
    "06": {"06p": 0, "06d": 0},
    "07": {"07p": 0, "07d": 0},
    "08": {"08p": 0, "08d": 0},
    "09": {"09p": 0, "09d": 0},
    "10": {"10p": 0, "10d": 0},
    "11": {"11p": 0, "11d": 0},
    "12": {"12p": 0, "12d": 0},
  }
  try {
    const { collectionName, data, fieldsToUpdate } = req.body;
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection(collectionName.split(" ")[0]);

    const bulkOperations = data.map((item) => {
      // Find the existing document based on the 'sifra' field
      const filter = { sifra: item.sifra };
    
      // Prepare an update object based on the fieldsToUpdate map
      const updateFields = {};
      Object.keys(fieldsToUpdate).forEach((key) => {
        if (fieldsToUpdate[key]) {
          mapValue = fieldsMap[key]
          Object.keys(mapValue).forEach((property) => {
            updateFields[property] = item[property];
          })
        }
      });
    
      // Create an update operation with upsert: true
      const updateOperation = {
        updateOne: {
          filter,
          update: { $set: updateFields },
          upsert: true,
        },
      };
    
      return updateOperation;
    });
    
    // Execute the bulk write operation
    const result = await collection.bulkWrite(bulkOperations);

    // Close the MongoDB connection
    client.close();

    // Respond with success message
    res.json({ 
      success: true, 
      message: 'Data saved successfully',
      countInserted: result.nInserted,
      countUpdated: result.nUpserted
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
